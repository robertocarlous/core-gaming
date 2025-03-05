"use client";

import Image from "next/image";
import BackgroundImg from "../component/BackgroundImg";
import Logo from "../assets/BREEVS_logo_1.png";
import Russian from "../assets/RR_LOGO_2_1.png";

const DesktopLeaderboard: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-screen bg-[#030B1F]">
      {/* Background Image */}
      <BackgroundImg>

      {/* Sidebar Navigation */}
      <nav className="w-[250px] bg-[#121A2F] text-white p-6 flex flex-col space-y-6 fixed h-full">
        <Image src={Logo} alt="Breevs Logo" className="w-32 mx-auto" />
        <ul className="space-y-4">
          <li className="hover:text-gray-400 cursor-pointer">Home</li>
          <li className="hover:text-gray-400 cursor-pointer">Rankings</li>
          <li className="hover:text-gray-400 cursor-pointer">Settings</li>
        </ul>
      </nav>

      {/* Leaderboard Section */}
      <main className="ml-[260px] flex-1 p-8 text-white">
        <h1 className="text-3xl font-bold mb-6">Best Players Rankings</h1>
        <div className="bg-[#1A233A] p-6 rounded-lg shadow-lg">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="p-3">#</th>
                <th className="p-3">Player</th>
                <th className="p-3">Played</th>
                <th className="p-3">Wins</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, i) => (
                <tr key={i} className="border-b border-gray-700">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 flex items-center space-x-2">
                    <Image
                      src={Russian}
                      alt="Player Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <span>Player {i + 1}</span>
                  </td>
                  <td className="p-3">{Math.floor(Math.random() * 700)}</td>
                  <td className="p-3">{Math.floor(Math.random() * 500)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      </BackgroundImg>
    </div>
  );
};

export default DesktopLeaderboard;
