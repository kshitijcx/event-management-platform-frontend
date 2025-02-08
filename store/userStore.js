import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStore = create()(
  persist(
    (set) => ({
      userId: null,
      userToken: null,
      userName: null,
      setUser: (id, token, name) =>
        set(() => ({
          userId: id,
          userToken: token,
          userName: name,
        })),
      deleteUser: () => {
        set(() => ({ userId: null, userToken: null, userName: null }));
        localStorage.removeItem("auth");
      },
    }),
    {
      name: "auth",
    }
  )
);

export default useStore;
