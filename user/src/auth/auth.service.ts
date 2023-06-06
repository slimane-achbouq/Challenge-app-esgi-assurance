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
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hash = await this.hashData(createUserDto.password);

    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash,
    });

    const tokens = await this.getTokens(
      newUser._id,
      newUser.email,
      newUser.roles,
    );

    const payload = {
      email: createUserDto.email,
      token: tokens.accessToken,
    };

    await this.utilsService
      .send({ cmd: 'singInConfirmationEmail' }, payload)
      .toPromise();

    await this.updateRefreshToken(newUser._id, tokens.refreshToken);

    return tokens;
  }

  async signIn(data: AuthDto) {
    // Check if user exists
    const user = await this.usersService.findByUserByEmail(data.email);
    if (!user) throw new BadRequestException('User does not exist');

    if (!user.isValide)
      throw new BadRequestException(`User profile is not activated !`);

    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user._id, user.email, user.roles);
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

  async getTokens(userId: string, username: string, roles: Role[]) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          roles: roles,
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

  async verifyProfile(verifyProfileDto: VerifyDto) {
    const user: User = await this.usersService.findByUserByEmail(
      verifyProfileDto.email,
    );

    if (!user)
      throw new BadRequestException(
        `User with email ${verifyProfileDto.email}  does not exist`,
      );

    const tokenValidation = await this.jwtService.verifyAsync(
      verifyProfileDto.token,
      {
        secret: process.env.JWT_ACCESS_SECRET,
      },
    );

    if (tokenValidation) {
      await this.usersService.update(user._id, { isValide: true });
      return 'User profile activated !';
    }

    return new Error('Token wrong !');
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
}
