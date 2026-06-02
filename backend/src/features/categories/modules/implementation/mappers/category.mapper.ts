import { CategoryEntity } from '@features/categories/domains/entities/category.entity';
import { CategoryDocument } from '@features/categories/domains/schemas/category.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryMapper {
  toEntity(doc: CategoryDocument): CategoryEntity {
    const entity = new CategoryEntity(doc._id);
    entity.setName(doc.name);
    entity.setIcon(doc.icon);
    entity.setColor(doc.color);
    entity.setIsDefault(doc.isDefault);
    return entity;
  }
}
