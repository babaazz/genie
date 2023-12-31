"use client";
import { MAX_API_LIMIT } from "@/constants";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/useProModal";

interface freeCounterProps {
  freeTrialCount: number;
  isPremium: boolean;
}

const FreeCounter = ({
  freeTrialCount = 0,
  isPremium = false,
}: freeCounterProps) => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (isPremium) return null;

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {freeTrialCount} / {MAX_API_LIMIT} free generations
            </p>
            <Progress
              className="h-3"
              value={(freeTrialCount * 100) / MAX_API_LIMIT}
            />
          </div>
          <Button
            variant="premium"
            className="w-full"
            onClick={proModal.onOpen}
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
