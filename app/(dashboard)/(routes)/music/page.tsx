import Heading from "@/components/heading";
import { Music } from "lucide-react";
const MusicGenPage = () => {
  return (
    <div>
      <Heading
        title="Music Generation"
        description="Turn your prompt into music."
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
    </div>
  );
};

export default MusicGenPage;
