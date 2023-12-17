import { AppDispatch, RootState } from "@/redux/store";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setLicenseDeadline } from "@/redux/features/userSlice";
import DatePicker from "@/components/atoms/DatePiker";

export const Licence = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <li className="bg-white rounded-lg shadow-md p-4 mb-4 text-center flex flex-row justify-items-center">
      練習許可証の期限：
      <DatePicker
        selectedDate={
          user?.license_deadline ? new Date(user.license_deadline) : null
        }
        onDateChange={(date: Date) =>
          dispatch(setLicenseDeadline(date.toISOString().split("T")[0]))
        }
      />
    </li>
  );
};
