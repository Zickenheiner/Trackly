import { GoalEntity } from '@features/goals/domains/entities/goal.entity';
import { GoalDocument } from '@features/goals/domains/schemas/goal.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoalMapper {
  toEntity(doc: GoalDocument): GoalEntity {
    const entity = new GoalEntity(doc._id);
    entity.setUserId(doc.userId);
    entity.setName(doc.name);
    entity.setTargetAmount(doc.targetAmount);
    entity.setSavedAmount(doc.savedAmount ?? 0);
    entity.setDeadline(doc.deadline);
    entity.setDescription(doc.description);
    entity.setStatus(doc.status ?? 'in_progress');
    entity.setCreatedAt((doc as any).createdAt);
    return entity;
  }
}
