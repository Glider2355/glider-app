import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { UserRole as UserRoleType } from "@/types";
import { UserRole } from "./UserRole";
import { useEffect, useMemo, useState } from "react";
import { fetchRole } from "@/redux/features/roleSlice";
import { fetchUserRole } from "@/redux/features/userRoleSlice";
import { addUserRole } from "@/redux/features/userRoleSlice";

export const UserRoleList = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRole());
    dispatch(fetchUserRole());
  }, [dispatch]);

  const userRolesFromStore = useSelector(
    (state: RootState) => state.userRole.userRoles
  );
  const memoizedUserRoles = useMemo(
    () => userRolesFromStore || [],
    [userRolesFromStore]
  );
  const [userRoles, setUserRoles] = useState<UserRoleType[]>(memoizedUserRoles);

  useEffect(() => {
    setUserRoles(userRolesFromStore);
  }, [userRolesFromStore]);

  const handleAddUserRole = () => {
    const newUserRole: UserRoleType = {
      user_id: 0,
      role_id: 0,
      certification: 1,
      role: {
        id: 0,
        name: "",
      },
    };
    dispatch(addUserRole(newUserRole));
  };

  if (!Array.isArray(userRoles)) {
    return null;
  }

  return (
    <div>
      <ul>
        {userRoles.map((userRole: UserRoleType, index: number) => (
          <UserRole key={index} index={index} userRole={userRole} />
        ))}
      </ul>
      <button
        onClick={handleAddUserRole}
        className="mx-auto block bg-gray-500 text-white py-2 px-4 mb-2 rounded"
      >
        ＋係の追加
      </button>
    </div>
  );
};
