"use client";

import { UserSetting } from "@/components/organisms/UserSetting/UserSetting";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-auto block"
        onClick={() => router.push("/camp")}
      >
        戻る
      </button>
      <h1 className="text-xl font-bold mb-4 text-center mt-2">ユーザー設定</h1>
      <UserSetting />
    </div>
  );
};
export default Page;
