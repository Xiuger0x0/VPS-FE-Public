import { IUser } from "@/interface/IUser";
import { atom } from "recoil";

export const countState = atom({
  key: "countState",
  default: 0,
});

export const userState = atom<IUser | null>({
  key: "userState",
  default: null,
});