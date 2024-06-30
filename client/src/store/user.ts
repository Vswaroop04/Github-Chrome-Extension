import { create } from "zustand";

// Define the type of your user state
type UserState = {
  user: {
    name: string;
    email?: string;
    githubUrl: string;
    githubRepos?: string[];
    extensionId?: string;
  };
  setUser: (user: Partial<UserState["user"]>) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: {
    name: "",
    githubUrl: "",
  },
  setUser: (user) =>
    set((state) => ({
      user: { ...state.user, ...user },
    })),
}));
