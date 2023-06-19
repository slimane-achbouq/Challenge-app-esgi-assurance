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

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject('UTILS_SERVICE') private readonly utilsService: ClientProxy,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<unknown> {
    // Check if user exists
    const userExists = await this.usersService.findByUserByEmail(
      createUserDto.email,
    );
    if (userExists) return { message: 'User already exist !' };

    // Hash password
    const hash = await this.hashData(createUserDto.password);

    const validationToken = uuidv4('8');

    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash,
      validationToken: validationToken,
    });

    const tokens = await this.getTokens(
      newUser._id,
      newUser.email,
      newUser.roles,
    );

    const payload = {
      email: createUserDto.email,
      token: newUser.validationToken,
    };

    /* try {
      await this.utilsService
        .send({ cmd: 'singInConfirmationEmail' }, payload)
        .toPromise();
    } catch (err) {
      return new BadRequestException(err);
    }

    */
    await this.updateRefreshToken(newUser._id, tokens.refreshToken);

    return 'User prfile was created with success !';
  }

  async signIn(data: AuthDto) {
    // Check if user exists
    const user = await this.usersService.findByUserByEmail(data.email);
    if (!user)
      return {
        message: 'User does not exist !',
      };

    if (!user.isValide)
      return {
        message: 'User profile is not activated !',
      };

    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches)
      return {
        message: 'Password is incorrect !',
      };

    const tokens = await this.getTokens(
      user._id,
      user.email,
      user.roles,
      user.isValide,
    );
    await this.updateRefreshToken(user._id, tokens.refreshToken);

    const response = { tokens: tokens, user: user };
    return response;
  }

  async logout(userId: string) {
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
    username: string,
    roles: Role[],
    isValide?: boolean,
  ) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
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
          sub: userId,
          username,
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

    if (!user)
      return {
        message: `Token wrong !`,
      };

    if (user.isValide)
      return {
        message: `User is already activated !`,
      };

    if (user.validationToken == verifyDto.token) {
      await this.usersService.update(user._id, { isValide: true });
      return {
        message: 'User profile activated !',
      };
    }

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
    const tokens = await this.getTokens(user.id, user.email, user.roles);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async resetPassword(resetPassword: resetPasswordDto) {
    const user: User = await this.usersService.findByUserByEmail(
      resetPassword.email,
    );

    console.log(resetPassword.email);

    console.log(user);

    if (!user)
      return {
        message: `User does not exist !`,
      };

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
      return new BadRequestException(err);
    }

    return {
      message: 'Please check your email to update password !',
    };
  }

  async updatePassword(updatePassword: updatePasswordDto) {
    const user: User = await this.usersService.findByUserBytoken(
      updatePassword.token,
    );

    if (!user)
      return {
        message: `User does not exist !`,
      };

    const hash = await this.hashData(updatePassword.password);

    await this.usersService.update(user._id, {
      password: hash,
    });

    return {
      message: 'User password was updated !',
    };
  }
}
