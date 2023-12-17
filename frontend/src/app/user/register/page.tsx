"use client";
import { FormEvent, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { helpPage } from "@/const";

interface Errors {
  last_name?: string[];
  first_name?: string[];
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
}

const Page = () => {
  const router = useRouter();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        API_URL + "user/register",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        },
        {
          withCredentials: true,
        }
      );
      Cookies.set("token", response.data.token, { expires: 365.25 * 10 });

      router.push("/camp");

      // Save the token or do whatever you want with the response here.
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
        <div className="flex w-full">
          <div className="flex flex-col w-1/2">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="姓"
              className="p-2 border border-gray-300 rounded mr-1"
            />
            {errors.last_name && errors.last_name[0] && (
              <p>{errors.last_name[0]}</p>
            )}
          </div>
          <div className="flex flex-col w-1/2">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="名"
              className="p-2 border border-gray-300 rounded ml-1"
            />
            {errors.first_name && errors.first_name[0] && (
              <p>{errors.first_name[0]}</p>
            )}
          </div>
        </div>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="もう一度パスワードを入力してください"
          className="p-2 border border-gray-300 rounded"
        />
        {errors.password_confirmation && errors.password_confirmation[0] && (
          <p>{errors.password_confirmation[0]}</p>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white py-3 px-6 rounded cursor-pointer"
        >
          登録
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
            router.push("/user/login");
          }}
        >
          ログインページへ
        </button>
      </div>
    </div>
  );
};
export default Page;
