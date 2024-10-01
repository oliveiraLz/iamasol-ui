export type ApiGetUsers = {
  id_user: string;
  name: string;
  email: string;
  groups: {
    id: string;
    name: string;
  }[];
  isAdmin: boolean;
};
