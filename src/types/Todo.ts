import { UserId } from './User';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: UserId;
}
