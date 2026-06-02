export interface GoalEntity {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  progress: number;
  deadline?: Date;
  description?: string;
  status: 'in_progress' | 'completed';
  createdAt: Date;
}
