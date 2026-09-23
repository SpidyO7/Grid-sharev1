import { LayoutDashboard, Store, Sun, Receipt, Users, Leaf, User } from "lucide-react";

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "market", label: "Energy Market", icon: Store },
  { id: "myenergy", label: "My Energy", icon: Sun },
  { id: "transactions", label: "Transactions", icon: Receipt },
  { id: "community", label: "Community", icon: Users },
  { id: "impact", label: "Impact", icon: Leaf },
  { id: "profile", label: "Profile", icon: User },
];
