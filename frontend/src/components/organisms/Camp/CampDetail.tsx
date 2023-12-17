import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCamp,
  fetchCampById,
  putCamp,
  setCampEndDate,
  setCampLocation,
  setCampName,
  setCampStartDate,
} from "@/redux/features/campSlice";
import { RootState } from "@/redux/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useParams, useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";
import { locationOptions } from "@/const";
import Modal from "../../molecules/Modal";

const CampDetail = () => {
  const param = useParams();
  const id = param["id"];

  const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();
  const selectedCamp = useSelector(
    (state: RootState) => state.camp.selectedCamp
  );

  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchCampById(Number(id)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (!selectedCamp) {
    return <div>Loading...</div>;
  }

  // 編集ボタンを押すと入力フォームを表示
  const handleEdit = () => {
    if (selectedCamp) {
      setIsEditing(true);
    }
  };

  const saveCamp = () => {
    if (selectedCamp && selectedCamp.name) {
      const startDate = new Date(selectedCamp.start_date);
      const endDate = new Date(selectedCamp.end_date);
      if (endDate <= startDate) {
        alert("撤収日は集合日より後にしてください");
        return;
      }

      dispatch(putCamp(selectedCamp)).then(() => {
        setIsEditing(false);
      });
    }
  };

  const handleDelete = () => {
    if (selectedCamp) {
      dispatch(deleteCamp(selectedCamp.id)).then(() => {
        router.push("/camp");
      });
    }
  };

  return (
    <div className="flex justify-center mt-2">
      <div className="p-6 bg-gray-100 rounded-lg shadow-md border w-full md:w-1/3">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isEditing ? (
            <input
              type="text"
              value={selectedCamp.name}
              onChange={(e) => dispatch(setCampName(e.target.value))}
            />
          ) : (
            selectedCamp.name
          )}
        </h1>

        <div className="mb-2">
          <div className="flex justify-center mx-10">
            <label className="w-20 text-right mr-2">集合日：</label>
            {isEditing ? (
              <DatePicker
                locale={ja}
                dateFormat={"yyyy-MM-dd"}
                selected={new Date(selectedCamp.start_date)}
                onChange={(date: Date) =>
                  dispatch(setCampStartDate(date.toISOString()))
                }
              />
            ) : (
              <span className="text-gray-600">{selectedCamp.start_date}</span>
            )}
          </div>

          <div className="flex justify-center mt-1 mx-10">
            <label className="w-20 text-right mr-2">撤収日：</label>
            {isEditing ? (
              <DatePicker
                locale={ja}
                dateFormat={"yyyy-MM-dd"}
                selected={new Date(selectedCamp.end_date)}
                onChange={(date: Date) =>
                  dispatch(setCampEndDate(date.toISOString()))
                }
              />
            ) : (
              <span className="text-gray-600">{selectedCamp.end_date}</span>
            )}
          </div>

          <div className="flex justify-center mt-1 mr-10">
            <label className="w-20 text-right mr-2">場所：</label>
            {isEditing ? (
              <select
                name="location"
                id="location"
                value={selectedCamp.location}
                onChange={(e) => dispatch(setCampLocation(e.target.value))}
              >
                <option value="" disabled>
                  選択してください
                </option>
                {locationOptions.map((location) => (
                  <option key={location.key} value={location.key}>
                    {location.value}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-gray-600">{selectedCamp.location}</span>
            )}
          </div>
        </div>

        <div className="flex justify-center mx-16">
          {isEditing ? (
            <button
              onClick={saveCamp}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
            >
              保存
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
            >
              編集
            </button>
          )}

          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            削除
          </button>

          <Modal
            show={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
          >
            <p className="text-xl font-bold text-red-500">
              本当に削除しますか？
            </p>
            <p>※合宿、全ての出入りが削除されます</p>
            <div>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                キャンセル
              </button>

              <button
                className="mt-4 ml-4 bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                削除
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CampDetail;
