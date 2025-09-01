export type Desciption = {
  nasa_id: string;
  title: string;
  description?: string;
};

export type Item = {
  data: Desciption[];
  links?: { href: string }[];
};
