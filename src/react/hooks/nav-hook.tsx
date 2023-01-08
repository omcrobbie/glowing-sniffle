import { createContext } from "react";

const baseUrl = "http://localhost:4200/users";

const context = createContext<any>(null);

interface Props {
  goTo: (url?: string) => void;
}

export const useNav = (): Props => {
  const goTo = (url?: string) => (window.location.href = `${baseUrl}/${url}`);
  return { goTo };
};
