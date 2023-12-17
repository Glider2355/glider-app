import { CampParticipation } from "@/types";
import { max } from "date-fns";

interface ParticipationProps {
  dateRange: Date[];
  participation: CampParticipation;
}

const Participation: React.FC<ParticipationProps> = ({
  dateRange,
  participation,
}) => {
  const timeSlotTranslator = (timeSlot: string, isParticipating: boolean) => {
    if (isParticipating) {
      switch (timeSlot) {
        case "morning":
          return "朝来";
        case "afternoon":
          return "昼来";
        case "night":
          return "夜来";
        default:
          return "";
      }
    } else {
      switch (timeSlot) {
        case "morning":
          return "朝帰";
        case "afternoon":
          return "昼帰";
        case "night":
          return "夜帰";
        default:
          return "";
      }
    }
  };

  const attendances = participation.attendances;

  const getAttendancesArray = () => {
    const attendancesArray: string[] = [];

    dateRange.forEach((date) => {
        attendancesArray.push(attendances[date.toISOString().slice(0, 10)]);
    });
    return attendancesArray;
  };

  return (
    <tr key={participation.user_id}>
      {/* 以下、出入りを表示 */}
      <td className="border px-4 py-2 text-center whitespace-nowrap">
        {participation.user_last_name + " " + participation.user_first_name}
      </td>
      <td className="border px-4 py-2 text-center whitespace-nowrap">
        {participation.user_university}
      </td>
      <td className="border px-4 py-2 text-center whitespace-nowrap">
        {participation.grade}
      </td>
      <td className="border px-4 py-2 text-center whitespace-nowrap">
        {participation.user_role.map((role) => role.toString()).join(", ")}
      </td>
      <td
        className={`border px-4 py-2 text-center whitespace-nowrap ${
          new Date(participation.licence_deadline) < max(dateRange)
            ? "text-red-500"
            : ""
        }`}
      >
        {participation.licence_deadline}
      </td>
      <td className="border px-4 py-2 text-center whitespace-nowrap">
        {participation.age}
      </td>
      {getAttendancesArray().map((attendance, index) => (
        <td
          className="border px-4 py-2 text-center whitespace-nowrap"
          key={index}
        >
          {attendance}
        </td>
      ))}
    </tr>
  );
};

export default Participation;
