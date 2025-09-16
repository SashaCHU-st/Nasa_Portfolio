export type SignUpBody = {
  name: string;
  email: string;
  password: string;
};

export type LoginBody = {
  email: string;
  password: string;
};

export type UserEditProfileBody = {
  name: string;
  password: string;
  image?: string | null;
};

export type UserBody = {
  id: number;
};

export type FavoriteBody = {
  nasa_id: string;
  title?: string;
  description?: string;
  image?: string;
};

export type DeleteFavBody = {
  nasa_id: string;
};

export type FollowBody = {
  follow_id: number;
};
