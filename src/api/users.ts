import { ApiGetUsers } from "../@types/User";
import { api } from "../service/api";

export const findUsers = async () => {
  return await api.get<ApiGetUsers[]>("/user").then(({ data }) => {
    console.log("usuários", data);
    return data;
  });
};
