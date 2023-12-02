import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getFreeTrialCount } from "@/lib/apiLimit";
import { auth } from "@clerk/nextjs";

const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  const freeTrialCount: number = userId ? await getFreeTrialCount(userId) : 0;
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:flex-col md:fixed md: w-72 md:inset-y-0 bg-gray-900">
        <Sidebar freeTrialCount={freeTrialCount} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashBoardLayout;
