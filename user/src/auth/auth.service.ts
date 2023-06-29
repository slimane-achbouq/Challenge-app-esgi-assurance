import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import * as argon2 from 'argon2';
import { VerifyDto } from './dto/verify-profile.dto';
import { User } from 'src/users/schemas/user.schema';
import { Role } from 'src/users/enums/roles.enum';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { resetPasswordDto } from './dto/reset-password.dto';
import { updatePasswordDto } from './dto/update-password.dto';
import {WinstonModule} from "nest-winston";
import {format, transports} from "winston";

@Injectable()
export class AuthService {
  private logger = null;

  constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
      @Inject('UTILS_SERVICE') private readonly utilsService: ClientProxy,
  ) {
    this.logger = WinstonModule.createLogger({
      transports: [
        new transports.File({
          level: 'debug',
          filename: 'logs/debug.log',
          format: format.combine(format.timestamp(), format.json()),
        }),
        new transports.File({
          level: 'error',
          filename: 'logs/error.log',
          format: format.combine(format.timestamp(), format.json()),
        }),
        new transports.Console({
          format: format.combine(
              format.colorize({message: true}),
          )
        }),
      ]
    });
  }

  async signUp(createUserDto: CreateUserDto): Promise<unknown> {
    // Check if user exists
    const userExists = await this.usersService.findByUserByEmail(
        createUserDto.email,
    );
    if (userExists) {
      this.logger.error("signUp attempt error : user " + createUserDto.email + " already exists", "error");
      return { message: 'User already exist !' };
    }

    // Hash password
    const hash = await this.hashData(createUserDto.password);

    // token for profile validation
    const validationToken = uuidv4('8');

    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash,
      validationToken: validationToken,
    });

    // create token that contain id, emai, roles of user
    const tokens = await this.getTokens(
        newUser._id,
        newUser.firstname,
        newUser.lastname,
        newUser.email,
        newUser.roles,
    );

    const payload = {
      email: createUserDto.email,
      token: newUser.validationToken,
    };

    // call utils ms for send email validation to the new profile
    try {
      await this.utilsService
          .send({ cmd: 'singInConfirmationEmail' }, payload)
          .toPromise();
    } catch (err) {
      this.logger.error("signUp confirmation mail error : for user " + createUserDto.email, "error");
      return new BadRequestException(err);
    }

    await this.updateRefreshToken(newUser._id, tokens.refreshToken);

    this.logger.debug("debug", "signUp new user created : " + createUserDto.email);
    return {
      message: 'User profile was created with success !',
    };
  }

  async signIn(data: AuthDto) {
    // Check if user exists
    const user = await this.usersService.findByUserByEmail(data.email);
    if (!user){
      this.logger.error("signIn attempt error : email " + data.email + " not found", "error");
      return {
        message: 'User does not exist !',
      };
    }

    // Check if user profile is valide
    if (!user.isValide) {
      this.logger.error("signIn attempt error : email " + data.email + " not activated", "error");
      return {
        message: 'User profile is not activated !',
      };
    }

    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches){
      this.logger.error("signIn attempt error : password for email " + data.email + " not correct", "error");
      return {
        message: 'Password is incorrect !',
      };
    }

    const tokens = await this.getTokens(
        user._id,
        user.firstname,
        user.lastname,
        user.email,
        user.roles,
        user.isValide,
    );
    await this.updateRefreshToken(user._id, tokens.refreshToken);

    this.logger.debug("debug", "signIn : email " + data.email);
    return tokens;
  }

  async logout(userId: string) {
    this.logger.debug("debug", "logout : user ID " + userId);
    return this.usersService.update(userId, { refreshToken: null });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(
      userId: string,
      firstname: string,
      lastname: string,
      email: string,
      roles: Role[],
      isValide?: boolean,
  ) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
          {
            id: userId,
            firstname: firstname,
            lastname: lastname,
            email: email,
            roles: roles,
            profileStatus: isValide,
          },
          {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '600m',
          },
      ),
      this.jwtService.signAsync(
          {
            id: userId,
            firstname: firstname,
            lastname: lastname,
            email: email,
            roles: roles,
            profileStatus: isValide,
          },
          {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '7d',
          },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyProfile(verifyDto: VerifyDto) {
    const user: User = await this.usersService.findByUserBytoken(
        verifyDto.token,
    );

    if (!user) {
      this.logger.error("verifyProfile attempt : user not found/token wrong", "error");
      return {
        message: `Token wrong !`,
      };
    }

    if (user.isValide) {
      this.logger.error("verifyProfile attempt : user " + user.email + " already activated", "error");
      return {
        message: `User is already activated !`,
      };
    }

    if (user.validationToken == verifyDto.token) {
      this.logger.debug("debug", "verifyProfile : user " + user.email + " activated");
      await this.usersService.update(user._id, { isValide: true });
      return {
        message: 'User profile activated !',
      };
    }

    this.logger.error("verifyProfile attempt : wrong token", "error");
    return {
      message: 'Token wrong !',
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
        user.refreshToken,
        refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(
        user.id,
        user.firstname,
        user.lastname,
        user.email,
        user.roles,
    );
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async resetPassword(resetPassword: resetPasswordDto) {
    const user: User = await this.usersService.findByUserByEmail(
        resetPassword.email,
    );

    if (!user) {
      this.logger.error("resetPassword attempt : user does not exist", "error");
      return {
        message: `User does not exist !`,
      };
    }

    const validationToken = uuidv4('8');

    await this.usersService.update(user._id, {
      validationToken: validationToken,
    });

    const payload = {
      email: resetPassword.email,
      token: validationToken,
    };

    try {
      await this.utilsService
          .send({ cmd: 'resetPasswordEmail' }, payload)
          .toPromise();
    } catch (err) {
      this.logger.error("resetPassword attempt : Bad request", "error");
      return new BadRequestException(err);
    }

    this.logger.debug("debug", "resetPassword : mail sent for user " + resetPassword.email);
    return {
      message: 'Please check your email to update password !',
    };
  }

  async updatePassword(updatePassword: updatePasswordDto) {
    const user: User = await this.usersService.findByUserBytoken(
        updatePassword.token,
    );

    if (!user) {
      this.logger.error("updatePassword attempt : user does not exist", "error");
      return {
        message: `User does not exist !`,
      };
    }

    const hash = await this.hashData(updatePassword.password);

    await this.usersService.update(user._id, {
      password: hash,
    });

    this.logger.debug("debug", "updatePassword : user ID " + user._id + " updated password");
    return {
      message: 'User password was updated !',
    };
  }
}