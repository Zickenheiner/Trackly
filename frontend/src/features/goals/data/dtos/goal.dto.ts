export interface CreateGoalRequestDto {
  name: string;
  targetAmount: number;
  deadline?: string;
  initialAmount?: number;
  description?: string;
}

export interface GoalResponseDto {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  progress: number;
  deadline?: string;
  description?: string;
  status: 'in_progress' | 'completed';
  createdAt: string;
}
