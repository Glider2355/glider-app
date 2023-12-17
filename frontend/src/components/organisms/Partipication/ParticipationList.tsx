import { CampParticipation } from "@/types";
import Participation from "./Participation";

interface ParticipationListProps {
  dateRange: Date[];
  participations: CampParticipation[];
}

const ParticipationList: React.FC<ParticipationListProps> = ({
  dateRange,
  participations,
}) => {
  return (
    <tbody>
      {participations.map((participation: CampParticipation) => (
        <Participation
          key={participation.user_id}
          dateRange={dateRange}
          participation={participation}
        />
      ))}
    </tbody>
  );
};

export default ParticipationList;
