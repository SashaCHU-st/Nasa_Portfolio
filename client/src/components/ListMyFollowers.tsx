import { useEffect, useState } from "react";
import type { ListMySubscriptionProps } from "../types/types";
import SubAndFollow from "./SubAndFollow";

const BACK_API = import.meta.env.VITE_BACKEND_API;

const ListMyFollowers = ({ users, setUsers }: ListMySubscriptionProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      setLoading(true);
      const res = await fetch(`${BACK_API}/getMyFollowers`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setLoading(false);
      setUsers(data.mySubscrib);
    };
    fetchSubscriptions();
  }, []);

  return (
    <div>
      <SubAndFollow users={users} loading={loading} />
    </div>
  );
};

export default ListMyFollowers;
