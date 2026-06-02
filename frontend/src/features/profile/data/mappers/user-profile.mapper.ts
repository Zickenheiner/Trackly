import type { UserProfileEntity } from '../../domain/entities/user-profile.entity';
import type { UserProfileResponseDto } from '../dtos/user-profile.dto';

class UserProfileMapper {
  toEntity(dto: UserProfileResponseDto): UserProfileEntity {
    return {
      id: dto.id,
      title: dto.title,
      firstName: dto.firstName,
      lastName: dto.lastName,
      age: dto.age,
      email: dto.email,
      currency: dto.currency,
      createdAt: new Date(dto.createdAt),
    };
  }
}

export default UserProfileMapper;
