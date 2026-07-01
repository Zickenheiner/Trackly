import type { UserProfileEntity } from '../entities/user-profile.entity';
import type { UpdateProfileRequestDto } from '../../data/dtos/user-profile.dto';

export interface UserProfileRepository {
  getMe(): Promise<UserProfileEntity>;
  updateMe(data: UpdateProfileRequestDto): Promise<UserProfileEntity>;
}
