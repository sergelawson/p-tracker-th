import { createContext } from "react";
export type UserType = {
  email: string;
  name: string;
  role: "driver" | "tracker" | "admin";
  accesToken?: string;
  refreshToken?: string;
};
type ContextType = { user: UserType | null; setUser: (value: any) => void };

const UserContext = createContext<ContextType>({
  user: null,
  setUser: (value) => value,
});

export default UserContext;
