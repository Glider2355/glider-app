import { AppDispatch, RootState } from "@/redux/store";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setBirthday } from "@/redux/features/userSlice";
import DatePicker from "@/components/atoms/DatePiker";

export const Birthday = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <li className="bg-white rounded-lg shadow-md p-4 mb-4 text-center flex flex-row justify-center">
      生年月日：
      <DatePicker
        selectedDate={user?.birthday ? new Date(user.birthday) : null}
        onDateChange={(date: Date ) =>
          dispatch(setBirthday(date.toISOString().split("T")[0]))
        }
      />
    </li>
  );
};
