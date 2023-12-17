"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  deleteUserRole,
  deleteUserRoleByIndex,
  editUserRoleByIndex,
  fetchUserRole,
} from "../../../redux/features/userRoleSlice";
import { UserRole as UserRoleType } from "@/types";

type UserRoleProps = {
  index: number;
  userRole: UserRoleType;
};

export const UserRole = ({ index, userRole }: UserRoleProps) => {
  const dispatch: AppDispatch = useDispatch();

  // reduxから取得したデータを格納
  const roles = useSelector((state: RootState) => state.role.roles);
  const loading = useSelector((state: RootState) => state.userRole.loading);

  const handleEditUserRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectOption = e.target.options[e.target.selectedIndex];
    const selectRoleId = Number(selectOption.getAttribute("select-id"));
    const selectRoleName = selectOption.value;

    const updatedUserRole: UserRoleType = {
      ...userRole,
      role: {
        ...userRole.role,
        id: selectRoleId,
        name: selectRoleName,
      },
    };
    dispatch(editUserRoleByIndex({ index, userRole: updatedUserRole }));
  };

  const handleEditUserRoleCertification = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCertification = Number(e.target.value);
    const updatedUserRole: UserRoleType = {
      ...userRole,
      certification: selectedCertification,
    };
    dispatch(editUserRoleByIndex({ index, userRole: updatedUserRole }));
  };

  const handleDeleteUserRole = async () => {
    if (userRole.id === undefined) {
      dispatch(deleteUserRoleByIndex(index));
      return;
    }
    try {
      await dispatch(deleteUserRole(userRole.id)).unwrap();
      dispatch(fetchUserRole());
    } catch (error) {
      console.error("Error deleting user role:", error);
    }
  };

  // userRoleが取得されていない場合、非表示にする
  if (loading) {
    return null;
  }

  return (
    <li className="bg-white rounded-lg shadow-md p-4 mb-4 text-center flex flex-nowrap justify-center items-center space-x-2">
      <span>係：</span>
      <select
        className="border-2 border-gray-300 rounded-md"
        value={userRole.role.name}
        onChange={handleEditUserRole}
      >
        <option value="" disabled>
          係を選択してください
        </option>
        {roles.map((role) => (
          <option key={role.id} select-id={role.id} value={role.name}>
            {role.name}係
          </option>
        ))}
      </select>

      <select
        className="border-2 border-gray-300 rounded-md"
        value={userRole.certification}
        onChange={handleEditUserRoleCertification}
      >
        <option select-crefication="1" value="1">
          認定
        </option>
        <option select-crefication="0" value="0">
          養成
        </option>
      </select>
      <button
        onClick={handleDeleteUserRole}
        className="bg-red-500 text-white font-bold py-0.5 px-4 rounded whitespace-nowrap"
      >
        削除
      </button>
    </li>
  );
};
