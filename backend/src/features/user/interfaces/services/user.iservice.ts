import {
  CreateUserDto,
  UpdatePreferencesDto,
  UpdateProfileDto,
  UpdateUserDto,
  UserPreferencesDto,
  UserProfileDto,
} from '@features/user/domains/dtos/user.dto';
import { UserEntity } from '@features/user/domains/entities/user.entity';

export interface IUserService {
  findAll(): Promise<UserEntity[] | null>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  create(dto: CreateUserDto): Promise<boolean>;
  update(id: string, dto: UpdateUserDto): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  getProfile(userId: string): Promise<UserProfileDto>;
  updateProfile(userId: string, dto: UpdateProfileDto): Promise<UserProfileDto>;
  updatePreferences(userId: string, dto: UpdatePreferencesDto): Promise<UserPreferencesDto>;
}
