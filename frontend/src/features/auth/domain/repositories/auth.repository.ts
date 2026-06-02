import type { AuthEntity } from '../entities/auth.entity';
import type { RegisterRequestDto } from '../../data/dtos/auth.dto';

export interface AuthRepository {
  register(data: RegisterRequestDto): Promise<AuthEntity>;
}
