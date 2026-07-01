export type GoalStatus = 'in_progress' | 'completed';

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  progress: number;
  deadline?: string;
  description?: string;
  status: GoalStatus;
  createdAt: string;
}

export interface CreateGoalPayload {
  name: string;
  targetAmount: number;
  deadline?: string;
  initialAmount?: number;
  description?: string;
}

export interface UpdateGoalPayload {
  name?: string;
  targetAmount?: number;
  deadline?: string;
  description?: string;
}

export interface AddDepositPayload {
  amount: number;
  date?: string;
}
