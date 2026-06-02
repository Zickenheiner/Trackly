import type { GoalEntity } from '../../domain/entities/goal.entity';
import type { GoalResponseDto } from '../dtos/goal.dto';

class GoalMapper {
  toEntity(dto: GoalResponseDto): GoalEntity {
    return {
      id: dto.id,
      name: dto.name,
      targetAmount: dto.targetAmount,
      savedAmount: dto.savedAmount,
      progress: dto.progress,
      deadline: dto.deadline ? new Date(dto.deadline) : undefined,
      description: dto.description,
      status: dto.status,
      createdAt: new Date(dto.createdAt),
    };
  }

  toEntityList(dtos: GoalResponseDto[]): GoalEntity[] {
    return dtos.map((dto) => this.toEntity(dto));
  }
}

export default GoalMapper;
