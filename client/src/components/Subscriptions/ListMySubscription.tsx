import { useEffect, useState, useCallback } from "react";
import type { ListMySubscriptionProps } from "../../types/types";

import SubAndFollow from "./SubAndFollow";
import { getMySubscribeRequest } from "../../api/apiUsers";
// import { useAuth } from "../context/AuthContext";

const ListMySubscription = ({ users, setUsers }: ListMySubscriptionProps) => {
  const [loading, setLoading] = useState(false);
  // const { isAuthorized } = useAuth();

  const fetchSubscriptions = useCallback(async () => {
    try {
      setLoading(true);
      const { ok, data } = await getMySubscribeRequest();

      if (!ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setUsers(data.mySubscrib);
    } catch (err) {
      console.error("Error fetching subscriptions:", err);
    } finally {
      setLoading(false);
    }
  }, [setUsers, setLoading]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  return (
    <div>
      <SubAndFollow users={users} loading={loading} />
    </div>
  );
};

export default ListMySubscription;
