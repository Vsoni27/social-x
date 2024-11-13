export interface UserDataType {
  _id: string;
  id: string;
  name: string;
  username: string;
  bio: string;
  image: string;
  communities: string[];
  threads: string[];
  followedBy: string[];
  following: string[];
  likedThread: string[];
  onboarded: boolean;
}

export interface ThreadDataType {
  _id: string;
  description: string;
  author: string;
  community?: string | null;
  likedBy: string[];
  createdAt: string;
  parentId: string | null;
  children: string[];
}
