export type Desciption = {
  nasa_id: string;
  title: string;
  description?: string;
};

export type Item = {
  data: Desciption[];
  links?: { href: string }[];
};

export interface CardProps {
  paginatedItems: Item[];
pages:PageScrollerProps
}

export interface PageScrollerProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export type UsersType = {
  id:number;
  name:string;
  email:string;
};
export type SearchUserProps = 
{
  setUsers: (users: UsersType[]) => void;
  allUsers: UsersType[];
}

export type ProfileProps = 
{
  id:string;
}