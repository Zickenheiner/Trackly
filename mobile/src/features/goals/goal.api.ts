import { request } from '@/core/api/client';
import endpoints from '@/core/api/endpoints';
import type {
  AddDepositPayload,
  CreateGoalPayload,
  Goal,
  UpdateGoalPayload,
} from './goal.types';

export function getGoals(): Promise<Goal[]> {
  return request<Goal[]>({
    url: endpoints.goals.base,
    method: 'GET',
  });
}

export function getGoal(id: string): Promise<Goal> {
  return request<Goal>({
    url: endpoints.goals.byId(id),
    method: 'GET',
  });
}

export function createGoal(payload: CreateGoalPayload): Promise<Goal> {
  return request<Goal>({
    url: endpoints.goals.base,
    method: 'POST',
    data: payload,
  });
}

export function updateGoal(
  id: string,
  payload: UpdateGoalPayload,
): Promise<Goal> {
  return request<Goal>({
    url: endpoints.goals.byId(id),
    method: 'PATCH',
    data: payload,
  });
}

export function deleteGoal(id: string): Promise<void> {
  return request<void>({
    url: endpoints.goals.byId(id),
    method: 'DELETE',
  });
}

export function addDeposit(
  id: string,
  payload: AddDepositPayload,
): Promise<Goal> {
  return request<Goal>({
    url: endpoints.goals.deposits(id),
    method: 'POST',
    data: payload,
  });
}
