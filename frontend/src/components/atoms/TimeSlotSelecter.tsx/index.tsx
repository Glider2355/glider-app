import { PraticipationTimeSlot, ReturnTimeSlot } from "@/const";
import React from "react";

interface TimeSlotSelectorProps {
  selectedTimeSlot: string;
  onOptionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string | null;
  className?: string;
}

const PraticipationTimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedTimeSlot,
  onOptionChange,
  error,
  className,
}) => {
  return (
    <div>
      <select
        className={`p-2 border border-gray-300 rounded ${className}`}
        value={selectedTimeSlot}
        onChange={onOptionChange}
      >
        <option value="" disabled>
          参加する時間帯を選択してください
        </option>
        {PraticipationTimeSlot.map((option) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
};

const ReturnTimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedTimeSlot,
  onOptionChange,
  error,
  className,
}) => {
  return (
    <div>
      <select
        className={`p-2 border border-gray-300 rounded ${className}`}
        value={selectedTimeSlot}
        onChange={onOptionChange}
      >
        <option value="" disabled>
          帰る時間帯を選択してください
        </option>
        {ReturnTimeSlot.map((option) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
};

export { PraticipationTimeSlotSelector, ReturnTimeSlotSelector };
