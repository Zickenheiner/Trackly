import type { AuthEntity } from '../entities/auth.entity';
import type { LoginRequestDto, RegisterRequestDto } from '../../data/dtos/auth.dto';

export interface AuthRepository {
  register(data: RegisterRequestDto): Promise<AuthEntity>;
  login(data: LoginRequestDto): Promise<AuthEntity>;
  logout(): Promise<void>;
}
