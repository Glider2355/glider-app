"use client";

import CampDetail from "@/components/organisms/Camp/CampDetail";
import CampParticipation from "@/components/organisms/Partipication/CampParticipation";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block mt-4"
        onClick={() => {
          router.push("/camp");
        }}
      >
        戻る
      </button>
      <CampDetail />
      <CampParticipation />
    </div>
  );
};

export default Page;
