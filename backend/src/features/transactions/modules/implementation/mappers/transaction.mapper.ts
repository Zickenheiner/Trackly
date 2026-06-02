import { CategoryDocument } from '@features/categories/domains/schemas/category.schema';
import { TransactionEntity } from '@features/transactions/domains/entities/transaction.entity';
import { TransactionDocument } from '@features/transactions/domains/schemas/transaction.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionMapper {
  toEntity(
    doc: TransactionDocument,
    category: CategoryDocument,
  ): TransactionEntity {
    const entity = new TransactionEntity(doc._id);
    entity.setType(doc.type);
    entity.setAmount(doc.amount);
    entity.setLabel(doc.label);
    entity.setNote(doc.note ?? null);
    entity.setDate(doc.date);
    entity.setCategory({
      id: category._id.toString(),
      name: category.name,
      icon: category.icon,
      color: category.color,
    });
    entity.setCreatedAt(
      (doc as TransactionDocument & { createdAt: Date }).createdAt,
    );
    return entity;
  }
}
