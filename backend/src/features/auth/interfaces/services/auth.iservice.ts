import { RegisterDto, LoginDto, TokensDto } from '@features/auth/domains/dtos/auth.dto';

export interface IAuthService {
  register(dto: RegisterDto): Promise<boolean>;
  login(dto: LoginDto): Promise<TokensDto>;
  logout(userId: string): Promise<boolean>;
  refreshTokens(userId: string, refreshToken: string): Promise<TokensDto>;
}
