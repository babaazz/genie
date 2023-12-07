"use client";

import axios from "axios";
import { Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface SubscriptionButtonProps {
  isPremium: boolean;
}

export const SubscriptionButton = ({
  isPremium = false,
}: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log("BILLING_ERROR", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      onClick={onClick}
      variant={isPremium ? "default" : "premium"}
    >
      {isPremium ? "Manage Subscription" : "Upgrade"}
      {!isPremium && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
