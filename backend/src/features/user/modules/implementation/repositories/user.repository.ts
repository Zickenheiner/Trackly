import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '../../../interfaces/repositories/user.irepository';
import { User, UserDocument } from '@features/user/domains/schemas/user.schema';
import { UserEntity } from '@features/user/domains/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '@features/user/domains/dtos/user.dto';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly userMapper: UserMapper,
  ) {}

  async findAll(): Promise<UserEntity[] | null> {
    const users = await this.userModel.find().exec();
    return users ? users.map((doc) => this.userMapper.toEntity(doc)) : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.userModel.findById(id).exec();
    return user ? this.userMapper.toEntity(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ? this.userMapper.toEntity(user) : null;
  }

  async create(dto: CreateUserDto): Promise<boolean> {
    const document = new this.userModel(dto);
    const createdUser = await document.save();
    return !!createdUser;
  }

  async update(id: string, dto: UpdateUserDto): Promise<boolean> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    return !!updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
