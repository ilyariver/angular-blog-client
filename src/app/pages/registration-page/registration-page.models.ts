export interface BaseEntity {
  createdAt?: string;
  updatedAt?: string;
}

export interface User extends BaseEntity {
  _id?: string;
  fullName: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  token?: string;
}
