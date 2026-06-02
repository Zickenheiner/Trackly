import type { AuthRepository } from '../../domain/repositories/auth.repository';
import type { AuthEntity } from '../../domain/entities/auth.entity';
import type { LoginRequestDto, RegisterRequestDto } from '../dtos/auth.dto';
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

  async login(data: LoginRequestDto): Promise<AuthEntity> {
    const dto = await this.api.login(data);
    return this.mapper.toEntity(dto);
  }

  async logout(): Promise<void> {
    await this.api.logout();
  }
}

export default AuthRepositoryImpl;
