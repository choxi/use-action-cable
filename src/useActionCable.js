// libraries
import { useEffect, useContext, useState } from "react";

// ActionCableHooks
import { ActionCableContext } from "./context.jsx";

export const useActionCable = (params, handlers = {}) => {
  const { conn } = useContext(ActionCableContext);
  const [subscription, setSubscription] = useState(null);
  const diff = JSON.stringify({ params, url: conn && conn._url });

  useEffect(() => {
    if (params && conn) {
      setSubscription(conn.subscriptions.create(params, handlers));
    }

    return () => subscription && subscription.unsubscribe();
  }, [diff]);

  return subscription;
};
