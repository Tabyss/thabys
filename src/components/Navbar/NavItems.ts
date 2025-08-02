import { NavbarItemType } from "./components/NavItems";

export const NAV_ITEMS: NavbarItemType[] = [
  { type: "item", href: "/", label: "Home" },
  { type: "login", label: "Login" },
  { type: "divider" },
  { type: "item", href: "/daily-fun", label: "Diary" },
  { type: "item", href: "/word-generator", label: "Generator" },
  { type: "divider" },
  { type: "item", href: "/admin", label: "Admin", locked: true },
];
