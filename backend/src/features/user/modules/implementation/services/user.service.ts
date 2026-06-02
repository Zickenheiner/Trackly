import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../../../interfaces/services/user.iservice';
import { IUserRepository } from '@features/user/interfaces/repositories/user.irepository';
import {
  CreateUserDto,
  UpdateUserDto,
} from '@features/user/domains/dtos/user.dto';
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
}
