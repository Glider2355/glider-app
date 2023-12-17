"use client";
import { UserUniversity } from "./UserUniversity";

import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  fetchUserUniversity,
  postUserUniversity,
} from "@/redux/features/userUniversitySlice";
import { fetchUserRole, postUserRole } from "@/redux/features/userRoleSlice";

import { userUniversityParams, userRoleParams } from "@/types";
import { UserRoleList } from "./UserRoleList";
import { useSelector } from "react-redux";
import { User } from "./User/User";
import { Grade } from "./User/Grade";
import { userParams } from "@/types/Request/User";
import { putUser } from "@/redux/features/userSlice";
import { Licence } from "./User/Licence";
import { Birthday } from "./User/Birthday";

export const UserSetting = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const userRoles = useSelector((state: RootState) => state.userRole.userRoles);
  const userUniversity = useSelector(
    (state: RootState) => state.userUniversity.userUniversity
  );

  const handleRegister = async () => {
    // 所属大学を登録
    if (userUniversity.university_id !== 0) {
      const userUniversityParams: userUniversityParams = {
        university_id: userUniversity.university.id,
      };
      await dispatch(postUserUniversity(userUniversityParams));
    }

    // 学年を登録
    if (user?.grade !== null) {
      const userGradeParams: userParams = {
        grade: user?.grade,
      };
      await dispatch(putUser(userGradeParams));
    }

    // 練習許可証の期限を登録
    if (
      user?.license_deadline !== null &&
      user?.license_deadline !== undefined
    ) {
      const userLicenseDeadlineParams: userParams = {
        license_deadline: user.license_deadline,
      };
      await dispatch(putUser(userLicenseDeadlineParams));
    }

    // 生年月日を登録
    if (user?.birthday !== null && user?.birthday !== undefined) {
      const userBirthdayParams: userParams = {
        birthday: user.birthday,
      };
      await dispatch(putUser(userBirthdayParams));
    }

    // ユーザの係を登録
    if (userRoles !== null) {
      for (const userRole of userRoles) {
        const userRoleParams: userRoleParams = {
          id: userRole.id,
          role_id: userRole.role.id,
          certification: userRole.certification,
        };
        await dispatch(postUserRole(userRoleParams));
      }
    }

    // 登録後に再取得して再レンダリングをトリガー
    dispatch(fetchUserUniversity());
    dispatch(fetchUserRole());
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <ul>
        <User />
        <UserUniversity />
        <Grade />
        <Licence />
        <Birthday />
        <UserRoleList />
      </ul>
      <button
        onClick={handleRegister}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        登録
      </button>
    </div>
  );
};
