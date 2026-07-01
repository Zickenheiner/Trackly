import {
  RegisterDto,
  LoginDto,
  TokensDto,
  AuthResponseDto,
} from '@features/auth/domains/dtos/auth.dto';

export interface IAuthService {
  register(dto: RegisterDto): Promise<AuthResponseDto>;
  login(dto: LoginDto): Promise<AuthResponseDto>;
  logout(userId: string): Promise<boolean>;
  refreshTokens(userId: string, refreshToken: string): Promise<TokensDto>;
}
