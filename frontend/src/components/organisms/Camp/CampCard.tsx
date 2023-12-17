"use client";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamp } from "../../../redux/features/campSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { Camp, initCamp } from "@/types";
import { useRouter } from "next/navigation";
import { fetchUser } from "@/redux/features/userSlice";
import ParticipationModal from "../Partipication/Modal/ParticipationModal";

export const CampCard = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);
  const camps = useSelector((state: RootState) => state.camp.camps);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState<Camp>(initCamp);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchCamp());
  }, [dispatch]);

  const handleCampClick = (camp: Camp) => {
    if (camp) {
      router.push(`/camp/${camp.id}`);
    }
  };

  const handleModelOpen = (camp: Camp) => {
    setSelectedCamp(camp);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <ul className="flex flex-col items-center">
      {camps.map((camp) => (
        <li
          className="bg-white rounded-lg shadow-md p-4 mb-4"
          key={camp.id}
          onClick={() => {}}
        >
          <div className="mb-4">
            <span className="font-bold">合宿名：</span>
            <span>{camp.name}</span>
          </div>
          <div className="mb-4">
            <span className="font-bold">　場所：</span>
            <span>{camp.location}</span>
          </div>
          <div className="mb-4">
            <span className="font-bold">集合日：</span>
            <span>{camp.start_date.toString()}</span>
          </div>
          <div>
            <span className="font-bold">撤収日：</span>
            <span>{camp.end_date.toString()}</span>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-2"
            onClick={() => handleModelOpen(camp)}
          >
            参加申請
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-2"
            onClick={() => handleCampClick(camp)}
          >
            合宿詳細
          </button>

          <ParticipationModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            selectedCamp={selectedCamp}
          />
        </li>
      ))}
    </ul>
  );
};
