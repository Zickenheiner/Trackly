import type { AuthRepository } from '../../domain/repositories/auth.repository';
import type { AuthEntity } from '../../domain/entities/auth.entity';
import type { RegisterRequestDto } from '../dtos/auth.dto';
import AuthApi from '../datasources/auth.api';
import AuthMapper from '../mappers/auth.mapper';

class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly api: AuthApi = new AuthApi(),
    private readonly mapper: AuthMapper = new AuthMapper(),
  ) {}

  async register(data: RegisterRequestDto): Promise<AuthEntity> {
    const dto = await this.api.register(data);
    return this.mapper.toEntity(dto);
  }
}

export default AuthRepositoryImpl;
