"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdOutlineMoreTime } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
interface Params {
  params: {
    userId: string;
  };
}
const userSchema = z.object({
  last_name: z.string().min(1, "This field is required"),
  middle_name: z.string().optional(),
  first_name: z.string().min(1, "This field is required"),
  age: z.number().min(1, "This field is required").max(130),
  gender: z.enum(["Male", "Female", "LGBTQ+"]),
  role: z.enum(["Student", "Staff", "Other"]),
  reason: z.string().min(1, "This field is required"),
});
type UserSchema = z.infer<typeof userSchema>;
function EditInfo({ params }: Params) {
  const router = useRouter();
  const getUserDetails = useQuery({
    queryKey: ["user", params.userId],
    queryFn: async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/get_user_details_edit_info/${params.userId}`
      );
      return response.data.message[0];
    },
  });
  const editUserMutation = useMutation({
    mutationFn: async (data: UserSchema) => {
      const response = await axios.post("");
    },
  });
  const {
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });
  useEffect(() => {
    if (getUserDetails.data) {
      reset(getUserDetails.data);
    }
  }, [reset, getUserDetails.data]);
  if (getUserDetails.isLoading) {
    return <h1>...Loading</h1>;
  }
  const date = new Date(getUserDetails.data.date_created).getTime();
  const dateFormatted = new Date(date).toDateString();
  function editUser(data: UserSchema) {
    editUserMutation.mutate(data);
  }
  return (
    <div className="bg-primary w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(editUser)}
        className={`w-full md:max-w-[800px] bg-white rounded-sm p-3 space-y-2 flex flex-col`}
      >
        <h1 className="text-primary font-semibold text-xl">
          EDIT YOUR PROFILE
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
          <div>
            <label
              htmlFor="firstname"
              className="font-semibold text-primary text-[0.8rem]"
            >
              First Name
            </label>
            <input
              {...register("first_name")}
              type="text"
              id="firstname"
              name="first_name"
              placeholder="@e.g Tristan Vic"
              className="w-full py-2.5 px-2 bg-slate-200 rounded-md outline-[1px] outline-primary placeholder:text-slate-500 text-sm"
            />
            {errors.first_name?.message && (
              <p className="text-red-500 text-[0.8rem]">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="middlename"
              className="font-semibold text-primary text-[0.8rem]"
            >
              Middle Name{" "}
              <small className="font-semibold italic text-[0.6rem]">
                (optional)
              </small>
            </label>
            <input
              {...register("middle_name")}
              type="text"
              id="middlename"
              name="middle_name"
              placeholder="@e.j Tacurda"
              className="w-full py-2.5 px-2 bg-slate-200 rounded-md outline-[1px] outline-primary placeholder:text-slate-500 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="font-semibold text-primary text-[0.8rem]"
            >
              Last Name
            </label>
            <input
              {...register("last_name")}
              type="text"
              id="lastname"
              name="last_name"
              placeholder="@e.g Clarito"
              className="w-full py-2.5 px-2 bg-slate-200 rounded-md outline-[1px] outline-primary placeholder:text-slate-500 text-sm"
            />
            {errors.last_name?.message && (
              <p className="text-red-500 text-[0.8rem]">
                {errors.last_name.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="age"
              className="font-semibold text-primary text-[0.8rem]"
            >
              Age
            </label>
            <input
              {...register("age", { valueAsNumber: true })}
              type="number"
              id="age"
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
            onClick={() => router.push(`/login/edit/${params.userId}`)}
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
      <DevTool control={control} />
    </div>
  );
}

export default EditInfo;
