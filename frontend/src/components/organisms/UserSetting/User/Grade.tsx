import { setGrade } from "@/redux/features/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { gradeOptions } from "@/const";
import GradeSelecter from "@/components/atoms/GradeSelecter";

export const Grade = () => {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);

      const handleGradeChange = (
        value: string
      ) => {
        dispatch(setGrade(value));
      };


    return (
      <li className="bg-white rounded-lg shadow-md p-4 mb-4 text-center">
        学年：
            <GradeSelecter
              selectedValue={user?.grade}
              onChange={handleGradeChange}
            />
        </li>
    );
    };
