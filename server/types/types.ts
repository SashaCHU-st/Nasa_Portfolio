export type SignUpBody = {
  name: string;
  email: string;
  password: string;
};

export type LoginBody = {
  email: string;
  password: string;
};


export type UserBody =
{
  id:number
}