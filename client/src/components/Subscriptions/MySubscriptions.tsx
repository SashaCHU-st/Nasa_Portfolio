import { useState } from "react";
import type { UsersType } from "../../types/types";
import ListMySubscription from "./ListMySubscription";
import ListMyFollowers from "./ListMyFollowers";

const MySubscriptions = () => {
  const [users, setUsers] = useState<UsersType[]>([]);
  const [activeTab, setActiveTab] = useState<"subscriptions" | "followers">(
    "subscriptions",
  );

  return (
    <div>
      <div className="flex justify-between border-gray-300 mb-4">
        <button
          className={`font-orbitron uppercase text-sm sm:text-lg md:text-xl font-bold text-cyan-400 tracking-widest
                     [text-shadow:0_0_2px_#0ff,0_0_2px_#0ff] mb-4 ${
                       activeTab === "subscriptions"
                         ? "border-b-2 border-blue-500 text-blue-500"
                         : "text-gray-500"
                     }`}
          onClick={() => setActiveTab("subscriptions")}
        >
          Subscriptions
        </button>
        <button
          className={`font-orbitron uppercase text-sm sm:text-lg md:text-xl font-bold text-cyan-400 tracking-widest
                     [text-shadow:0_0_2px_#0ff,0_0_2px_#0ff] mb-4 ${
                       activeTab === "followers"
                         ? "border-b-2 border-blue-500 text-blue-500"
                         : "text-gray-500"
                     }`}
          onClick={() => setActiveTab("followers")}
        >
          Followers
        </button>
      </div>
      <div>
        {activeTab === "subscriptions" && (
          <ListMySubscription users={users} setUsers={setUsers} />
        )}
        {activeTab === "followers" && (
          <ListMyFollowers users={users} setUsers={setUsers} />
        )}
      </div>
    </div>
  );
};

export default MySubscriptions;
