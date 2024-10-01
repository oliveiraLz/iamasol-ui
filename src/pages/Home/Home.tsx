import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { findUsers } from "../../api/users";
import { QueriesEnum } from "../../enums/QueriesEnum";

export const Home = () => {
  const { logout } = useAuth();

  const users = useQuery({
    queryKey: [QueriesEnum.USERS],
    queryFn: findUsers,
  });

  return (
    <div>
      Home
      <button onClick={logout}>logout</button>
      {users.isFetching ? <span>carregando...</span> : <div>carregou</div>}
    </div>
  );
};
