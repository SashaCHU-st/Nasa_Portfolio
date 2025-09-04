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

