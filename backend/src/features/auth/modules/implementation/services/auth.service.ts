import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { IAuthService } from '../../../interfaces/services/auth.iservice';
import { RegisterDto, LoginDto, TokensDto, AuthResponseDto } from '@features/auth/domains/dtos/auth.dto';
import { IUserService } from '@features/user/interfaces/services/user.iservice';
import { IUserRepository } from '@features/user/interfaces/repositories/user.irepository';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto): Promise<boolean> {
    return this.userService.create({
      ...dto,
      password: dto.password,
    });
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passwordMatch = await argon2.verify(user.getPassword(), dto.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const tokens = await this.generateTokens(user.getId(), user.getEmail());
    await this.updateRefreshToken(user.getId(), tokens.refreshToken);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.getId(),
        title: user.getTitle(),
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        age: user.getAge(),
        email: user.getEmail(),
        currency: user.getCurrency(),
      },
    };
  }

  async logout(userId: string): Promise<boolean> {
    return this.userRepository.update(userId, { refreshToken: null });
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<TokensDto> {
    const user = await this.userService.findById(userId);
    if (!user || !user.getRefreshToken()) {
      throw new ForbiddenException('Access denied');
    }
    const tokenMatch = await argon2.verify(user.getRefreshToken(), refreshToken);
    if (!tokenMatch) {
      throw new ForbiddenException('Access denied');
    }
    const tokens = await this.generateTokens(user.getId(), user.getEmail());
    await this.updateRefreshToken(user.getId(), tokens.refreshToken);
    return tokens;
  }

  private async generateTokens(userId: string, email: string): Promise<TokensDto> {
    const payload = { sub: userId, email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      }),
    ]);
    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const hashed = await argon2.hash(refreshToken);
    await this.userRepository.update(userId, { refreshToken: hashed });
  }
}
