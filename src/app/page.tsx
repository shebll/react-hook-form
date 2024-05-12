"use client";
import { useForm, useFieldArray } from "react-hook-form";

type formDataType = {
  name: string;
  age: number;
  bod: Date;
  email: string;
  social: {
    face: string;
    insta: string;
  };
  phones: string[];
  address: { value: string }[];
};
export default function Home() {
  const form = useForm<formDataType>({
    mode: "onChange",
    defaultValues: {
      address: [{ value: "" }],
    },
  });
  // distract from form
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "address",
  });
  // distract from register
  // const { onBlur, onChange, ref, name } = register("name");

  const onSubmit = (data: formDataType) => {
    console.log(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-14">
      <h1 className="text-4xl font-bold">React Hook Form Full Course</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-lg font-medium">
            Name :
          </label>
          <input
            className="bg-gray-200 px-4 py-2 outline-none rounded-lg text-base"
            type="text"
            id="name"
            {...register("name", {
              required: {
                value: true,
                message: "this required name",
              },
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="age" className="text-lg font-medium">
            Age :
          </label>
          <input
            className="bg-gray-200 px-4 py-2 outline-none rounded-lg text-base"
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              // required: {
              //   value: true,
              //   message: "this required age",
              // },
              // validate: {
              //   inAge: (felidValue) =>
              //     (felidValue >= 60 || felidValue < 18) && "bad age",
              // },
            })}
          />
          {errors.age && (
            <span className="text-red-500">{errors.age.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bod" className="text-lg font-medium">
            Your BOD :
          </label>
          <input
            className="bg-gray-200 px-4 py-2 outline-none rounded-lg text-base"
            type="date"
            id="bod"
            {...register("bod", {
              valueAsDate: true,
              required: {
                value: true,
                message: "this required bod",
              },
              // validate: {
              //   notAdmin: (felidValue) =>
              //     felidValue !== "admin" || "cant admin",
              // },
            })}
          />
          {errors.bod && (
            <span className="text-red-500">{errors.bod.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lg font-medium">
            Email :
          </label>
          <input
            className="bg-gray-200 px-4 py-2 outline-none rounded-lg text-base"
            type="text"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "this required",
              },
              validate: {
                notAdmin: (felidValue) =>
                  felidValue !== "admin" || "cant admin",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="social" className="text-lg font-medium">
            Social :
          </label>
          <input
            className="bg-gray-200 px-4 py-2 outline-none rounded-lg text-base"
            type="text"
            id="social"
            {...register("social.face", {
              required: {
                value: true,
                message: "this required facebook",
              },
              validate: {
                notAdmin: (felidValue) =>
                  felidValue.startsWith("face") || "not face url",
              },
            })}
          />
          {errors.social?.face && (
            <span className="text-red-500">{errors.social?.face.message}</span>
          )}
          <input
            className="bg-gray-200 px-4 py-2 outline-none rounded-lg text-base"
            type="text"
            id="social"
            {...register("social.insta", {
              required: {
                value: true,
                message: "this required insta",
              },
              validate: {
                notAdmin: (felidValue) =>
                  felidValue.startsWith("insta") || "not insta url",
              },
            })}
          />
          {errors.social?.insta && (
            <span className="text-red-500">{errors.social.insta.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone-1" className="text-lg font-medium">
            phone 1:
          </label>
          <input
            className="bg-gray-200 px-4 py-2 outline-none rounded-lg text-base"
            type="text"
            id="phone-1"
            {...register("phones.0", {
              required: {
                value: true,
                message: "this required phone 1",
              },
              validate: {
                notAdmin: (felidValue) =>
                  felidValue.startsWith("01") || "not good phone",
              },
            })}
          />
          {errors.phones?.[0] && (
            <span className="text-red-500">{errors.phones?.[0]?.message}</span>
          )}
          <label htmlFor="phone-2" className="text-lg font-medium">
            phone 2:
          </label>
          <input
            className="bg-gray-200 px-4 py-2 outline-none rounded-lg text-base"
            type="text"
            id="phone-2"
            {...register("phones.1", {
              required: {
                value: true,
                message: "this required phones 2",
              },
              validate: {
                notAdmin: (felidValue) =>
                  felidValue.startsWith("01") || "not good phone",
              },
            })}
          />
          {errors.phones?.[1] && (
            <span className="text-red-500">{errors.phones?.[1]?.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h1>Enter Address</h1>
          {fields.map((field, index) => {
            return (
              <div key={index} className="flex flex-col gap-2">
                <label htmlFor={field.id} className="text-lg font-medium">
                  address {index + 1}
                </label>
                <input
                  className="bg-gray-200 px-4 py-2 outline-none rounded-lg text-base"
                  type="text"
                  id={field.id}
                  {...register(`address.${index}.value`, {
                    required: {
                      value: true,
                      message: `this required address ${index + 1}`,
                    },
                  })}
                />
                {index > 0 && (
                  <button
                    onClick={() => remove(index)}
                    className="bg-red-500 text-white text-xl font-bold w-full text-center py-1 rounded-xl"
                  >
                    remove this address
                  </button>
                )}
                {errors.address?.[index]?.value && (
                  <span className="text-red-500">
                    {errors.address?.[index]?.value.message}
                  </span>
                )}
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => append({ value: "new address" })}
            className="bg-green-400 text-white text-xl font-bold w-full text-center py-1 rounded-xl"
          >
            add new address
          </button>
        </div>
        <div className="">
          <button
            type="submit"
            className="bg-green-500 text-white text-xl font-bold w-full text-center py-1 rounded-xl"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
