"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect } from "react";

import { fetchUniversity } from "../../../redux/features/universitySlice";
import {
  fetchUserUniversity,
  setUserUniversity,
  setUserUniversityId,
} from "../../../redux/features/userUniversitySlice";
import UniversitySelector from "@/components/atoms/UniversitySelecter";

export const UserUniversity = () => {
  const dispatch: AppDispatch = useDispatch();

  const userUniversity = useSelector(
    (state: RootState) => state.userUniversity.userUniversity
  );

  const handleUserUniversityChange = (id: number, name: string) => {
    dispatch(setUserUniversityId(id));
    dispatch(setUserUniversity(name));
  };

  useEffect(() => {
    dispatch(fetchUniversity());
    dispatch(fetchUserUniversity());
  }, [dispatch]);

  return (
    <li className="bg-white rounded-lg shadow-md p-4 mb-4 text-center">
      大学：
      <UniversitySelector
        selectedUniversity={userUniversity.university}
        onUniversityChange={handleUserUniversityChange}
      />
    </li>
  );
};
