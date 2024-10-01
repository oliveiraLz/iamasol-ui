import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../service/api";
import { ApiAuthLogin } from "../../@types/Auth";
import { useAuth } from "../../hooks/useAuth";

interface Schema {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export const Auth = () => {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm<Schema>({
    resolver: yupResolver(schema),
  });

  const signin = async (body: {
    email: string;
    password: string;
    application: string;
  }) => {
    return await api
      .post<ApiAuthLogin>("/auth/login", body)
      .then(({ data }) => {
        login(data.accessToken, data.refreshToken);
      })
      .catch(() => {});
  };

  const onSubmit = (data: Schema) => {
    const body = {
      email: data.email,
      password: data.password,
      application: import.meta.env.VITE_API_APPLICATION,
    };

    signin(body);
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email")}
          placeholder="Digite seu e-mail"
        />
        <input
          type="password"
          {...register("password")}
          placeholder="Digite sua senha"
        />

        <button type="submit">Fazer login</button>
      </form>
    </div>
  );
};
