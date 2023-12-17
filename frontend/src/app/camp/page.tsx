"use client";
import { CampCard } from "@/components/organisms/Camp/CampCard";
import { helpPage } from "@/const";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("camp/create");
  };

  const handleUserSetting = () => {
    router.push("user/setting");
  };

  return (
    <div className="bg-white p-4 flex flex-col items-center">
      <div className="flex items-center mb-4">
        <h1 className="text-xl font-bold ml-20">合宿一覧</h1>
        <a
          href={helpPage}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-10 bg-green-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded text-sm"
        >
          ヘルプ
        </a>
      </div>
      <button
        onClick={handleUserSetting}
        className="mx-auto block bg-blue-500 text-white font-bold h-10 py-0.5 px-4 rounded mt-4"
      >
        ユーザー設定
      </button>
      <button
        onClick={handleButtonClick}
        className="mx-auto block bg-blue-500 text-white font-bold h-10 py-0.5 px-4 rounded mt-2 mb-2"
      >
        合宿を追加
      </button>
      <CampCard />
    </div>
  );
};

export default Page;
