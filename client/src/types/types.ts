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
  loading: boolean;
  searchPressed: boolean;
  search: string;
  paginatedItems: Item[];
  pages: PageScrollerProps;
}

export interface PageScrollerProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export type UsersType = {
  id: number;
  name: string;
  email: string;
  image: string;
};
export type SearchUserProps = {
  setUsers: (users: UsersType[]) => void;
  allUsers: UsersType[];
};

export type ProfileProps = {
  id: number;
};

export type MyFav = {
  nasa_id: string;
  title: string;
  description?: string;
  image?: string;
};

export interface ListMySubscriptionProps {
  users: UsersType[];
  setUsers: React.Dispatch<React.SetStateAction<UsersType[]>>;
}

export type FollowersProps = {
  item: UsersType;
};

export interface SubFollowProps {
  users: UsersType[];
  loading: boolean;
}

export type NotYetProps = {
  item: string;
};

export interface PauseProps {
  setPaused: (value: boolean) => void;
  paused: boolean;
}
export interface AnimationProps {
  paused: boolean;
}

export interface AuthContextType {
  isAuthorized: boolean;
  loading: boolean;
  login: () => void;
  logout: () => void;
}
