// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Session, User } from "@supabase/supabase-js";

// interface UserStore {
//   user: User | null;
//   session: Session | null;
//   setUser: (user: User | null) => void;
//   setSession: (session: Session | null) => void;
//   isLoggedIn: Boolean;
//   setIsLoggedIn: (isLoggedIn: Boolean) => void;
// }

// type UserStoreWithPersist = UserStore & { isLoggedIn: boolean };

// export const useUserStore = create(
//   persist<UserStore>(
//     (set) => ({
//       user: null,
//       session: null,
//       isOnboarded: false,
//       isLoggedIn: false,
//       setUser: (user: User | null) => set((state) => ({ user })),
//       setSession: (session: Session | null) => set((state) => ({ session })),
//       setIsLoggedIn: (isLoggedIn: Boolean) => set((state) => ({ isLoggedIn })),
//     }),
//     {
//       name: "fintechcrypt-user-store",
//       storage: createJSONStorage(() => AsyncStorage),
//     }
//   )
// );


import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session, User } from "@supabase/supabase-js";

interface UserStore {
  user: User | null;
  session: Session | null;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isOnboarded: boolean;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      session: null,
      isOnboarded: false,
      isLoggedIn: false,
      setUser: (user: User | null) => set({ user }),
      setSession: (session: Session | null) => set({ session }),
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
    }),
    {
      name: "fintechcrypt-user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);