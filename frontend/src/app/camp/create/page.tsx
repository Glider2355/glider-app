"use client";
import { useRouter } from "next/navigation";
import { postCamp } from "@/redux/features/campSlice";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { campParams, CampError } from "@/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";

const Page = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [campName, setCampName] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [location, setLocation] = useState<string>("");

  const locationOptions: { value: string; label: string }[] = [
    { value: "木曽川", label: "木曽川" },
    { value: "大野", label: "大野" },
    { value: "福井", label: "福井" },
  ];

  const handleCampNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCampName(event.target.value);
  };

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLocation(event.target.value);
  };

  const handleCreateCamp = () => {
    if (validate()) {
      const newCamp: campParams = {
        name: campName,
        start_date: startDate.toISOString().split("T")[0],
        end_date: endDate.toISOString().split("T")[0],
        location: location,
      };
      try {
        dispatch(postCamp(newCamp));
        router.push("/camp");
      } catch (error) {
        console.error("Failed to post camp:", error);
      }
    }
  };

  const [errors, setErrors] = useState<CampError>({});

  const validate = () => {
    const newErrors: CampError = {};

    if (!campName) newErrors.name = "合宿名は必須です。";
    if (!startDate) newErrors.start_date = "集合日は必須です。";
    if (!endDate) newErrors.end_date = "撤収日は必須です。";
    if (!location) newErrors.location = "場所は必須です。";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => router.push('/camp')}
      >
        戻る
      </button>
      <h1 className="text-3xl font-bold mb-4 mt-6">合宿の新規作成</h1>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="campName" className="text-lg font-medium">
            合宿名：
          </label>
          <input
            type="text"
            id="campName"
            value={campName}
            onChange={handleCampNameChange}
            className="p-2 border border-gray-300 rounded w-64"
          />
        </div>
        {errors.name && <div className="text-red-600">{errors.name}</div>}

        <div className="flex items-center space-x-2">
          <label htmlFor="startDate" className="text-lg font-medium">
            集合日：
          </label>
          <DatePicker
            locale={ja}
            dateFormat={"yyyy/MM/dd"}
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            className="p-2 border border-gray-300 rounded w-64"
          />
        </div>
        {errors.start_date && (
          <div className="text-red-600">{errors.start_date}</div>
        )}

        <div className="flex items-center space-x-2">
          <label htmlFor="endDate" className="text-lg font-medium">
            撤収日：
          </label>
          <DatePicker
            locale={ja}
            dateFormat={"yyyy/MM/dd"}
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            className="p-2 border border-gray-300 rounded w-64"
          />
        </div>
        {errors.end_date && (
          <div className="text-red-600">{errors.end_date}</div>
        )}

        <div className="flex items-center space-x-2">
          <label htmlFor="location" className="text-lg font-medium">
            場所：
          </label>
          <select
            onChange={handleLocationChange}
            value={location}
            className="w-64 p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              合宿場所を選択してください
            </option>
            {locationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {errors.location && (
          <div className="text-red-600">{errors.location}</div>
        )}

        <button
          onClick={handleCreateCamp}
          className="bg-gray-700 text-white py-3 px-6 rounded cursor-pointer"
        >
          作成する
        </button>
      </div>
    </div>
  );
};
export default Page;
