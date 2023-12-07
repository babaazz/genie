"use client";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

interface MobilesidebarProps {
  freeTrialCount: number;
  isPremium: boolean;
}

const MobileSidebar = ({ freeTrialCount, isPremium }: MobilesidebarProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar isPremium={isPremium} freeTrialCount={freeTrialCount} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
