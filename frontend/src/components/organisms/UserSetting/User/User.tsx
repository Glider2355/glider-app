import { fetchUser } from "@/redux/features/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const User = () => {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <div>
            <h1>ユーザー情報</h1>
            <p>ユーザー名：{user?.last_name + " " + user?.first_name}</p>
            <p>メールアドレス：{user?.email}</p>
        </div>
    );
};
