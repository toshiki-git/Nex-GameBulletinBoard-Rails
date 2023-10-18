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

export interface NotificationDataType {
  id: number; // 通知のID
  content: string; // 通知の本文や説明
  user: UserDataType; // 通知をトリガーしたユーザー
  actor: {
    id: number;
    image_url: string;
  };
  notifiable: {
    content: string;
  };
}
