import React, { useEffect, useState } from "react";

const PlayersList: React.FC = () => {
  const [players, setPlayers] = useState<
    { name: string; tokens: number; gamesPlayed: number; gamesWon: number }[]
  >([]);

  useEffect(() => {
    fetch("/players.json") // fetch players data
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  // Calculate win percentage and sort players
  const rankedPlayers = players
    .map((player) => ({
      ...player,
      winPercentage: player.gamesPlayed
        ? (player.gamesWon / player.gamesPlayed) * 100
        : 0,
    }))
    .sort((a, b) => b.winPercentage - a.winPercentage);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Best Players Rankings</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Rank</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Tokens</th>
            <th className="border border-gray-300 px-4 py-2">Games Played</th>
            <th className="border border-gray-300 px-4 py-2">Games Won</th>
            <th className="border border-gray-300 px-4 py-2">Win %</th>
          </tr>
        </thead>
        <tbody>
          {rankedPlayers.map((player, index) => (
            <tr key={player.name} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{player.name}</td>
              <td className="border border-gray-300 px-4 py-2">{player.tokens}</td>
              <td className="border border-gray-300 px-4 py-2">{player.gamesPlayed}</td>
              <td className="border border-gray-300 px-4 py-2">{player.gamesWon}</td>
              <td className="border border-gray-300 px-4 py-2">
                {player.winPercentage.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersList;
