import MobileSidebar from "@/components/mobile-sidebar";
import { UserButton } from "@clerk/nextjs";

interface NavbarProps {
  freeTrialCount: number;
  isPremium: boolean;
}

const Navbar = ({ freeTrialCount = 0, isPremium = false }: NavbarProps) => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar isPremium={isPremium} freeTrialCount={freeTrialCount} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
