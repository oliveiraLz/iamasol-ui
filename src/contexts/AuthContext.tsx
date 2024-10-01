import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { jwtDecode } from "jwt-decode";
import { JwtToken, UserApplication } from "../@types/Auth";
import { api } from "../service/api";

interface AuthContextProps {
  user: UserApplication | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: React.ReactNode;
}

const ACCESS_TOKEN_KEY = import.meta.env.VITE_LOCAL_STORAGE_ACCESS_TOKEN;
const REFRESH_TOKEN_KEY = import.meta.env.VITE_LOCAL_STORAGE_REFRESH_TOKEN;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserApplication | null>(null);
  const [isDecoding, setIsDecoding] = useState<boolean>(true);

  const { setItem, removeItem } = useLocalStorage();
  const navigate = useNavigate();

  const decodeToken = (accessToken: string): UserApplication => {
    const decoded = jwtDecode<JwtToken>(accessToken);

    const user: UserApplication = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      roles: decoded.roles,
      tenant: decoded.tenant,
      isSuper: decoded.isSuper,
    };

    return user;
  };

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {
      setUser(decodeToken(accessToken));
    }

    setIsDecoding(false);
  }, []);

  useLayoutEffect(() => {
    api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    setItem(ACCESS_TOKEN_KEY, accessToken);
    setItem(REFRESH_TOKEN_KEY, refreshToken);

    setUser(decodeToken(accessToken));

    navigate("/", { replace: true });
  };

  const logout = () => {
    removeItem(ACCESS_TOKEN_KEY);
    removeItem(REFRESH_TOKEN_KEY);

    setUser(null);

    navigate("/login", { replace: true });
  };

  if (isDecoding) {
    return <>decodando...</>;
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
