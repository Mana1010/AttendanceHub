"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import randomString from "random-string";
import { MdOutlineMoreTime } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { QueryClient } from "@tanstack/react-query";
import { utilStore } from "@/store/utils.store";
import { useRouter } from "next/navigation";
import GetCode from "@/components/GetCode";
const userSchema = z.object({
  lastname: z.string().min(1, "This field is required"),
  middlename: z.string().optional(),
  firstname: z.string().min(1, "This field is required"),
  age: z.number().min(1, "This field is required").max(130),
  gender: z.enum(["Male", "Female", "LGBTQ+"]),
  role: z.enum(["Student", "Staff", "Other"]),
  reason: z.string().min(1, "This field is required"),
});
type UserSchema = z.infer<typeof userSchema>;
const randomCode = randomString({ length: 5, numeric: true });
function Register() {
  const [displayCode, setDisplayCode] = useState(false);
  const { setCode, setName } = utilStore();
  const router = useRouter();
  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<UserSchema>({
    defaultValues: {
      lastname: "",
      middlename: "",
      firstname: "",
      age: 1,
      gender: "Male",
      role: "Student",
      reason: "",
    },
    resolver: zodResolver(userSchema),
  });
  const queryClient = new QueryClient();
  const timeInMutation = useMutation({
    mutationFn: async (data: UserSchema) => {
      const formData = new FormData();
      const payload = { ...data, code: randomCode, timeIn: Date.now() };
      for (let [key, value] of Object.entries(payload)) {
        formData.append(key, value.toString());
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/add_user",
        formData
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      setDisplayCode(true);
      setCode(data.code);
      setName(data.first_name);
      toast.success(data.message);
      reset();
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });
  useEffect(() => {
    function loadFunc(e: BeforeUnloadEvent) {
      e.preventDefault();
    }
    window.addEventListener("beforeunload", loadFunc);
    return () => window.removeEventListener("beforeunload", loadFunc);
  }, []);
  function addUser(data: UserSchema) {
    timeInMutation.mutate(data);
  }
  return (
    <div className="w-full h-full flex justify-center items-center bg-primary">
      <form
        onSubmit={handleSubmit(addUser)}
        className={`w-full md:max-w-[800px] bg-white rounded-sm p-3 space-y-2 flex flex-col ${
          displayCode && "hidden"
        }`}
      >
        <h1 className="text-primary font-semibold text-xl">TIME IN</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
          <div>
            <label
              htmlFor="firstname"
              className="font-semibold text-primary text-[0.8rem]"
            >
              First Name
            </label>
            <input
              {...register("firstname")}
              type="text"
              id="firstname"
              name="firstname"
              placeholder="@e.g Tristan Vic"
              className="w-full py-2.5 px-2 bg-slate-200 rounded-md outline-[1px] outline-primary placeholder:text-slate-500 text-sm"
            />
            {errors.firstname?.message && (
              <p className="text-red-500 text-[0.8rem]">
                {errors.firstname.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="firstname"
              className="font-semibold text-primary text-[0.8rem]"
            >
              Middle Name{" "}
              <small className="font-semibold italic text-[0.6rem]">
                (optional)
              </small>
            </label>
            <input
              {...register("middlename")}
              type="text"
              name="middlename"
              placeholder="@e.j Tacurda"
              className="w-full py-2.5 px-2 bg-slate-200 rounded-md outline-[1px] outline-primary placeholder:text-slate-500 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="firstname"
              className="font-semibold text-primary text-[0.8rem]"
            >
              Last Name
            </label>
            <input
              {...register("lastname")}
              type="text"
              name="lastname"
              placeholder="@e.g Clarito"
              className="w-full py-2.5 px-2 bg-slate-200 rounded-md outline-[1px] outline-primary placeholder:text-slate-500 text-sm"
            />
            {errors.lastname?.message && (
              <p className="text-red-500 text-[0.8rem]">
                {errors.lastname.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="firstname"
              className="font-semibold text-primary text-[0.8rem]"
            >
              Age
            </label>
            <input
              {...register("age", { valueAsNumber: true })}
              type="number"
              name="age"
              max={130}
              min={1}
              className="w-full py-2.5 px-2 bg-slate-200 rounded-md outline-[1px] outline-primary placeholder:text-slate-500 text-sm"
            />
            {errors.age?.message && (
              <p className="text-red-500 text-[0.8rem]">{errors.age.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="gender"
              className="font-semibold text-primary text-[0.8rem]"
            >
              Select Gender
            </label>
            <select
              {...register("gender")}
              id="gender"
              name="gender"
              className="w-full py-2.5 px-2 bg-slate-200 rounded-md outline-[1px] outline-primary placeholder:text-slate-500 cursor-pointer text-sm"
            >
              <option value={"Male"} className="bg-slate-200 ">
                Male
              </option>
              <option value={"Female"} className="bg-slate-200 ">
                Female
              </option>
              <option value={"LGBTQ+"} className="bg-slate-200">
                LGBTQ+
              </option>
            </select>
            {errors.gender?.message && (
              <p className="text-red-500 text-[0.8rem]">
                {errors.gender.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="role"
              className="font-semibold text-primary text-[0.8rem]"
            >
              Select Role
            </label>
            <select
              {...register("role")}
              id="role"
              name="role"
              className="w-full py-2.5 px-2 bg-slate-200 rounded-md outline-[1px] outline-primary placeholder:text-slate-500 cursor-pointer text-sm"
            >
              <option value={"Student"} className="bg-slate-200 ">
                Student
              </option>
              <option value={"Staff"} className="bg-slate-200 ">
                Staff
              </option>
              <option value={"Others"} className="bg-slate-200">
                Others
              </option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="reason"
              className="font-semibold text-primary text-[0.8rem]"
            >
              Purpose of Visit
            </label>
            <textarea
              {...register("reason")}
              name="reason"
              id="reason"
              placeholder="Your Reason"
              className="w-full py-2.5 px-2 bg-slate-200 rounded-md outline-[1px] outline-primary placeholder:text-slate-500 h-[70px] resize-none text-sm"
            ></textarea>
            {errors.reason?.message && (
              <p className="text-red-500 text-[0.8rem]">
                {errors.reason.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <button
            onClick={() => router.push("/login")}
            type="button"
            className="flex space-x-1 items-center py-2.5 px-3 bg-primary border-[1px] border-primary bg-transparent text-secondary justify-center"
          >
            <span className="text-lg">
              <IoIosArrowBack />
            </span>
            <span>BACK</span>
          </button>
          <button
            type="submit"
            className="flex space-x-1 items-center py-2.5 px-4 bg-primary text-white justify-center"
          >
            <span className="text-lg">
              <MdOutlineMoreTime />
            </span>
            <span> TIME IN</span>
          </button>
        </div>
      </form>
      {displayCode && <GetCode />}
    </div>
  );
}

export default Register;
