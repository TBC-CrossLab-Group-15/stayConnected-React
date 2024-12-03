import React from "react";

interface User {
  id: string;
  name: string;
  avatar: string;
  score: number;
}

interface LeaderboardProps {
  users: User[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  const sortedUsers = [...users].sort((a, b) => b.score - a.score);

  const topThree = sortedUsers.slice(0, 3);
  const others = sortedUsers.slice(3, 10);

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      {/* Top 3 Users */}
      <div className="flex justify-between mb-6 gap-4">
        {topThree.map((user, index) => {
          const colors = ["bg-yellow-300", "bg-gray-300", "bg-orange-400"];
          return (
            <div
              key={user.id}
              className={`flex flex-col items-center p-4 rounded-lg shadow ${colors[index]} w-1/3`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full mb-2"
              />
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-sm">Score: {user.score}</p>
            </div>
          );
        })}
      </div>

      {/* Remaining Users */}
      <div className="bg-white rounded-lg shadow p-4">
        {others.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center p-2 border-b last:border-none hover:bg-gray-50"
          >
            <span className="w-6 font-bold text-gray-600">{index + 4}.</span>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full mx-4"
            />
            <div className="flex-grow">
              <h3 className="text-sm font-medium">{user.name}</h3>
              <p className="text-xs text-gray-500">Score: {user.score}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
