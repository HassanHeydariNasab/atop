export interface Post {
  user: number;
  text: string;
  liked: number;
  userName: string;
  // admin view only
  isActive?: boolean;
  isReported?: boolean;
  reported?: number;
}
