import { Camp, CampParticipationPrams } from "@/types";
import DatePicker from "@/components/atoms/DatePiker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  clearErrors,
  deleteCampParticipation,
  postCampParticipation,
} from "@/redux/features/campParticipationSlice";
import { useSelector } from "react-redux";
import Modal from "@/components/molecules/Modal";
import {
  PraticipationTimeSlotSelector,
  ReturnTimeSlotSelector,
} from "@/components/atoms/TimeSlotSelecter.tsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCamp: Camp;
}

export const ParticipationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  selectedCamp,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [startTimeSlot, setStartTimelot] = useState<string>("");
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [endTimeSlot, setEndTimeSlot] = useState<string>("");
  const errors = useSelector(
    (state: RootState) => state.campPrtification.errors?.errors
  );

  useEffect(() => {
    if (isOpen) {
      setStartDate(new Date(selectedCamp.start_date));
      setEndDate(new Date(selectedCamp.end_date));
    }
  }, [isOpen, selectedCamp, errors]);

  const handleStartTimeSlotChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStartTimelot(event.target.value);
  };

  const handleEndTimeSlotChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEndTimeSlot(event.target.value);
  };

  const handleSave = async () => {
    const params: CampParticipationPrams = {
      camp_id: selectedCamp.id,
      attendances: [
        {
          start_time_slot: startTimeSlot,
          start_date: startDate.toISOString().split("T")[0],
          end_time_slot: endTimeSlot,
          end_date: endDate.toISOString().split("T")[0],
        },
      ],
    };

    try {
      await dispatch(postCampParticipation(params)).unwrap();
      dispatch(clearErrors());
      onClose();
    } catch (error) {}
  };

  const handleDelete = () => {
    dispatch(deleteCampParticipation(selectedCamp.id));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal show={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4 text-center w-full">
        {selectedCamp?.name}
      </h2>

      <label htmlFor="startDate" className="text-lg font-medium">
        集合日
      </label>

      <DatePicker
        selectedDate={startDate}
        onDateChange={(date: Date) => setStartDate(date)}
        error={errors?.start_date && errors?.start_date[0] ? "error" : null}
        className="mb-2"
      />
      <PraticipationTimeSlotSelector
        selectedTimeSlot={startTimeSlot}
        onOptionChange={handleStartTimeSlotChange}
        error={
          errors?.start_time_slot && errors?.start_time_slot[0] ? "error" : null
        }
      />

      <label htmlFor="endDate" className="text-lg font-medium mt-2">
        撤収日
      </label>

      <DatePicker
        selectedDate={endDate}
        onDateChange={(date: Date) => setEndDate(date)}
        error={errors?.end_date && errors?.end_date[0] ? "error" : null}
        className="mb-2"
      />

      <ReturnTimeSlotSelector
        selectedTimeSlot={endTimeSlot}
        onOptionChange={handleEndTimeSlotChange}
        error={
          errors?.end_time_slot && errors?.end_time_slot[0] ? "error" : null
        }
      />

      <div className="flex justify-center w-full mt-4 flex-wrap-no">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4 whitespace-nowrap"
          onClick={onClose}
        >
          キャンセル
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4 whitespace-nowrap"
          onClick={handleDelete}
        >
          参加取り消し
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded whitespace-nowrap"
          onClick={handleSave}
        >
          参加する
        </button>
      </div>
    </Modal>
  );
};

export default ParticipationModal;
