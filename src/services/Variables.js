import {
  MapPinLine,
  Shower,
  CoatHanger,
  BabyCarriage,
  Basket,
} from "@phosphor-icons/react";

export const server = import.meta.env.VITE_API_URL;

export const categoryColors = {
  higiene: "bg-[var(--l-blue)]",
  vestuario: "bg-[var(--l-pink)]",
  alimento: "bg-[var(--l-yellow)]",
  mobilia: "bg-[var(--l-green)]",
};

export const categoryIcons = {
  higiene: Shower,
  vestuario: CoatHanger,
  alimento: Basket,
  mobilia: BabyCarriage,
};
