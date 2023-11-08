import { UserButton } from "@clerk/nextjs";
export default function DashboardPage() {
  return (
    <div>
      <p>Welcome !</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
