import Heading from "@/components/heading";
import { SubscriptionButton } from "@/components/subscriptionButton";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";

const SettingsPage = async () => {
  const isPremium = await checkSubscription();
  return (
    <div>
      <Heading
        title="Settings"
        description="Manage account settings."
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 spcae-y-4">
        <div className="text-muted-foreground text-sm mb-2">
          {isPremium ? "You are using Genie Premium" : "You are on free trial"}
        </div>
        <SubscriptionButton isPremium={isPremium} />
      </div>
    </div>
  );
};

export default SettingsPage;
