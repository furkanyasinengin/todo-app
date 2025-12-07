"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const registerSchema = z.object({
  name: z.string().min(3, "Name must be least 3 char."),
  email: z.email("Please use a valid email address."),
  password: z.string().min(3, "Password must be least 3 char."),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Register failed");
      }

      console.log("Register success: ", result);

      router.push("/login");
    } catch (error: unknown) {
      let errorMessage = "Register Failed";

      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error("Error: ", errorMessage);
      alert("Register Failed: " + errorMessage);
    }
  };
  return (
    <div className="relative flex min-h-screen justify-center items-center bg-gray-100 px-4 py-12 transition-colors duration-300 dark:bg-gray-900 sm:px-6 lg:px8">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-2xl transition-colors duration-300 dark:bg-gray-800">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Hesap Oluşturun
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Devam etmek için bilgilerinizi giriniz
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                İsim
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className={`mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm transition-colors duration-300 
                  ${
                    errors.name
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }
                  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400`}
                placeholder="John Will"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Adresi
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm transition-colors duration-300 
                  ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }
                  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400`}
                placeholder="ornek@site.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Şifre
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className={`mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm transition-colors duration-300
                  ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }
                  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400`}
                placeholder="*******"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? "Kayıt olunuyor..." : "Kayıt ol"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
