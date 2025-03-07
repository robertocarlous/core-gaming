"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gamepad2, BarChart2, Wallet } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/Home", icon: Home },
    { href: "/GameScreen", icon: Gamepad2 },
    { href: "/Leaderboard", icon: BarChart2 },
    { href: "/Wallet", icon: Wallet },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-[#121232] p-4 flex justify-around text-white">
      {navItems.map(({ href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-col items-center gap-1 ${
            pathname === href ? "text-blue-500" : "text-gray-400"
          }`}
        >
          <Icon size={24} />
          {/* <span className="text-xs">{label}</span> */}
        </Link>
      ))}
    </nav>
  );
}
