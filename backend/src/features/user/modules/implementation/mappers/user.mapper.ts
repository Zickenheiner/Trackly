import { Injectable } from '@nestjs/common';
import { UserEntity } from '@features/user/domains/entities/user.entity';
import { UserDocument } from '@features/user/domains/schemas/user.schema';

@Injectable()
export class UserMapper {
  toEntity(doc: UserDocument): UserEntity {
    const entity = new UserEntity(doc._id);
    entity.setTitle(doc.title);
    entity.setFirstName(doc.firstName);
    entity.setLastName(doc.lastName);
    entity.setAge(doc.age);
    entity.setEmail(doc.email);
    entity.setPassword(doc.password);
    entity.setCurrency(doc.currency);
    entity.setRefreshToken(doc.refreshToken);
    return entity;
  }
}
