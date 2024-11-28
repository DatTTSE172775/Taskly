"use client";

import Navigation from "@/components/ui/navigation";
import { usePathname } from "next/navigation";

const GuestNavigation: React.FC = () => {
  const pathName = usePathname();

  const isGuestPage = ["/", "/about", "/contact"].includes(pathName);

  return isGuestPage ? <Navigation /> : null;
};

export default GuestNavigation;
