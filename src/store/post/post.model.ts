export interface Post {
  id: number;
  user: number;
  text: string;
  liked: number;
  userName: string;
  creationDate: string;
  // admin view only
  isActive?: boolean;
  reported?: number;
}
