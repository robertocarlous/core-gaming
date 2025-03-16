"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gamepad2, Trophy, Wallet } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/game", label: "Game", icon: Gamepad2 },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/wallet", label: "Wallet", icon: Wallet },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-[#121232] p-4 flex justify-around text-white">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-col items-center gap-1 ${
            pathname === href ? "text-blue-500" : "text-gray-400"
          }`}
        >
          <Icon size={24} />
          <span className="text-xs">{label}</span>
        </Link>
      ))}
    </nav>
  );
}

