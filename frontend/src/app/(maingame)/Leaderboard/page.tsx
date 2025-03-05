"use client";

import BackgroundImgWithLogo from "@/component/BackgroundImgWithLogo";
// import Image from "next/image";

const Leaderboard: React.FC = () => {
  return (
    <BackgroundImgWithLogo>
      <main className="ml-[260px] flex-1 p-8 text-white h-screen">
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
    </BackgroundImgWithLogo>
  );
};

export default Leaderboard;
