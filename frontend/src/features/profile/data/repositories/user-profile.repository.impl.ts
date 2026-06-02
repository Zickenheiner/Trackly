import type { UserProfileRepository } from '../../domain/repositories/user-profile.repository';
import type { UserProfileEntity } from '../../domain/entities/user-profile.entity';
import type { UpdateProfileRequestDto } from '../dtos/user-profile.dto';
import UserProfileApi from '../datasources/user-profile.api';
import UserProfileMapper from '../mappers/user-profile.mapper';

class UserProfileRepositoryImpl implements UserProfileRepository {
  constructor(
    private readonly api: UserProfileApi = new UserProfileApi(),
    private readonly mapper: UserProfileMapper = new UserProfileMapper(),
  ) {}

  async getMe(): Promise<UserProfileEntity> {
    const dto = await this.api.getMe();
    return this.mapper.toEntity(dto);
  }

  async updateMe(data: UpdateProfileRequestDto): Promise<UserProfileEntity> {
    const dto = await this.api.updateMe(data);
    return this.mapper.toEntity(dto);
  }
}

export default UserProfileRepositoryImpl;
