import { gradeOptions } from "@/const";
import React from "react";

interface GradeSelectProps {
  selectedValue?: string;
  onChange: (value: string) => void;
}

const GradeSelecter: React.FC<GradeSelectProps> = ({ selectedValue, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select
      value={selectedValue || ""}
      onChange={handleChange}
      className="border-2 border-gray-300 rounded-md"
    >
      <option value="" disabled>
        学年を選択してください
      </option>
      {gradeOptions.map((grade) => (
        <option key={grade.key} value={grade.value}>
          {grade.value}
        </option>
      ))}
    </select>
  );
};

export default GradeSelecter;
