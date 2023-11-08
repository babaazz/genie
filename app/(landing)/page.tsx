import Link from "next/link";
import { Button } from "@/components/ui/button";
const LandingPage = () => {
  return (
    <div>
      Landing Page(unprotected)
      <div>
        <Link href="/sign-up">
          <Button>Register</Button>
        </Link>
      </div>
      <div>
        <Link href="/sign-in">
          <Button>Sign In</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
