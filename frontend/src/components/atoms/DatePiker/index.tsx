import DatePickerDefault from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";
import React from "react";

interface DatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
  error?: string | null;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
  error,
  className,
}) => {

  const handleDateChange = (date: Date) => {
    // 選択前の日付がnullの場合、UTCが使われるため日本時間のタイムゾーンを適用
    if (selectedDate === null) {
      const jstOffset = 9 * 60 * 60 * 1000;
      const jstDate = new Date(date.getTime() + jstOffset);
      onDateChange(jstDate);
    } else {
      onDateChange(date);
    }
  };

  return (
    <div>
      <DatePickerDefault
        locale={ja}
        dateFormat={"yyyy/MM/dd"}
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText="日付を選択してください"
        className={`border-2 border-gray-300 rounded ${className}`}
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
};

export default DatePicker;
