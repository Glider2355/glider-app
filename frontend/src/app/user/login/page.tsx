"use client";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { helpPage } from "@/const";

interface Errors {
  email?: string[];
  password?: string[];
}

const Page = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL + "user/login", {
        email,
        password,
      });
      Cookies.set("token", response.data.token, { expires: 365.25 * 10 });

      router.push("/camp");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        if (data && data.errors && typeof data.errors === "object") {
          setErrors(data.errors as Errors);
        } else {
          console.error("Unexpected error format:", data);
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen mr-5 ml-5">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full sm:w-1/2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          className="p-2 border border-gray-300 rounded"
        />
        {errors.email && errors.email[0] && <p>{errors.email[0]}</p>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          className="p-2 border border-gray-300 rounded"
        />
        {errors.password && errors.password[0] && <p>{errors.password[0]}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white py-3 px-6 rounded cursor-pointer"
        >
          ログイン
        </button>
      </form>
      <div className="flex space-x-4">
        <a
          href={helpPage}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          ヘルプページへ
        </a>
        <button
          className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => {
            router.push("/user/register");
          }}
        >
          新規登録ページへ
        </button>
      </div>
    </div>
  );
};
export default Page;
