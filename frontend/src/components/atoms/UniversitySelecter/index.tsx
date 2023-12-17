import React from "react";
import { University } from "@/types";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface UniversitySelectorProps {
  selectedUniversity: University | null;
  onUniversityChange: (id: number, name: string) => void;
}

const UniversitySelector: React.FC<UniversitySelectorProps> = ({
  selectedUniversity,
  onUniversityChange,
}) => {

  // reduxから取得したデータを格納
  const universities = useSelector(
    (state: RootState) => state.university.universities
  );

  const handleUniversityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedIndex = event.target.selectedIndex;
    const selectId =
      event.target.options[selectedIndex].getAttribute("select-id");
    if (selectId) {
      onUniversityChange(parseInt(selectId), event.target.value);
    }
  };

  return (
    <select
      className="border-2 border-gray-300 rounded-md"
      value={selectedUniversity?.name || ""}
      onChange={handleUniversityChange}
    >
      <option value="" disabled>
        大学を選択してください
      </option>
      {universities.map((university) => (
        <option
          key={university.id}
          select-id={university.id.toString()}
          value={university.name}
        >
          {university.name}大学
        </option>
      ))}
    </select>
  );
};

export default UniversitySelector;
