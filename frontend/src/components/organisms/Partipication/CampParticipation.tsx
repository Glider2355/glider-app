import { fetchCampParticipation } from "@/redux/features/campParticipationSlice";
import { RootState } from "@/redux/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ParticipationList from "./ParticipationList";

const CampParticipation = () => {
  const param = useParams();
  const id = param["id"];

  const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();

  const campParticipation = useSelector(
    (state: RootState) => state.campPrtification.campParticipations
  );
  const selectedCamp = useSelector(
    (state: RootState) => state.camp.selectedCamp
  );

  // 大学、学年でソート
  const sortedParticipation = campParticipation.slice().sort((a, b) => {
    if (a.user_university < b.user_university) {
      return -1;
    } else if (a.user_university > b.user_university) {
      return 1;
    } else {
      const gradeOrder: Record<string, number> = { D: 1, M: 2, B: 3 };
      return gradeOrder[a.grade.slice(0, 1)] - gradeOrder[b.grade.slice(0, 1)] ||
        parseInt(b.grade.slice(1)) - parseInt(a.grade.slice(1));
    }
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchCampParticipation(Number(id)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const startDate = new Date(selectedCamp.start_date);
  const endDate = new Date(selectedCamp.end_date);

  const getDatesBetween = (start: Date, end: Date) => {
    let datesArray = [];
    let currentDate = start;

    while (currentDate <= end) {
      datesArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return datesArray;
  };

  const dateRange = getDatesBetween(startDate, endDate);

  return (
    <div className="overflow-x-auto">
    <table className="table-auto min-w-full">
      <thead>
        <tr>
          <th className="px-4 py-2 whitespace-nowrap">名前</th>
          <th className="px-4 py-2 whitespace-nowrap">大学</th>
          <th className="px-4 py-2 whitespace-nowrap">学年</th>
          <th className="px-4 py-2 whitespace-nowrap">係</th>
          <th className="px-4 py-2 whitespace-nowrap">練許有効期限</th>
          <th className="px-4 py-2 whitespace-nowrap">年齢</th>
          {dateRange.map((date, index) => (
            <th className="px-4 py-2 whitespace-nowrap" key={index}>
              {date.toISOString().split("T")[0]}
            </th>
          ))}
        </tr>
      </thead>
      <ParticipationList
        dateRange={dateRange}
        participations={sortedParticipation}
      />
    </table>
  </div>

  );
};

export default CampParticipation;
