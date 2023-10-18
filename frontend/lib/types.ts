export interface UserDataType {
  id: number;
  username: string;
  email: string;
  password_digest: string;
  image_url: string;
  created_at: string;
}

export interface PostType {
  id: number;
  user_id: number;
  content: string;
  hashtags: string;
  image_url: string;
}

export interface CommentDataType {
  id: number;
  content: string;
  post_id: number;
  user_id: number;
  created_at: string;
  user: UserDataType;
}
