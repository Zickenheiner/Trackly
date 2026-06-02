import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserService } from '../../../interfaces/services/user.iservice';
import { IUserRepository } from '@features/user/interfaces/repositories/user.irepository';
import { CreateUserDto, UpdateProfileDto, UpdateUserDto, UserProfileDto } from '@features/user/domains/dtos/user.dto';
import { UserEntity } from '@features/user/domains/entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async findAll(): Promise<UserEntity[] | null> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }

  async create(dto: CreateUserDto): Promise<boolean> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await argon2.hash(dto.password);
    return this.userRepository.create({ ...dto, password: hashedPassword });
  }

  async update(id: string, dto: UpdateUserDto): Promise<boolean> {
    return this.userRepository.update(id, dto);
  }

  async delete(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }

  private toProfileDto(user: UserEntity): UserProfileDto {
    return {
      id: user.getId(),
      title: user.getTitle(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      age: user.getAge(),
      email: user.getEmail(),
      currency: user.getCurrency(),
      createdAt: user.getCreatedAt()?.toISOString() ?? null,
    };
  }

  async getProfile(userId: string): Promise<UserProfileDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return this.toProfileDto(user);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<UserProfileDto> {
    const updated = await this.userRepository.update(userId, dto);
    if (!updated) throw new NotFoundException('User not found');
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return this.toProfileDto(user);
  }
}
