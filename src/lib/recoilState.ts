import { ReserveProp } from "@/components/modal";
import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: 0,
});

export const reserveState = atom<ReserveProp[]>({
  key: "reserveState",
  default: [],
});
