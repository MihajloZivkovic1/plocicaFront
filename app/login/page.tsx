"use client"
import { login } from "../../lib";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MessageAlert } from "@/components/ui/MessageAlert"

import { useToast } from "@/hooks/use-toast"


export default function Page() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const toast = useToast();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("email", formData.email);
    form.append("password", formData.password);

    try {
      await login({
        email: formData.email,
        password: formData.password
      });

      toast.toast({
        title: "Success",
        description: "Uspešno ste se prijavili na vaš profil",
        variant: "default",
      })
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message === "NotFound") {
          setLoginError("User with that email does not exist");
        } else if (err.message === "CredentialsError") {
          setLoginError("Invalid password for user, please try again");
        } else {
          setLoginError("An unexpected error occurred. Please try again.");
        }
      } else {
        console.error("Unexpected error:", err);
        setLoginError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <section>
      <>
        <div>
          <section className="flex items-center justify-center height-for-form mt-28">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg dark:border dark:bg-gray-800 dark:border-gray-700">
              <div className="p-8 space-y-6">
                <a
                  href="#"
                  className="flex items-center mb-8 text-3xl font-semibold text-gray-900 dark:text-white"
                >
                  MemoryPlate
                </a>
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                  Ulogujte se
                </h1>
                {<MessageAlert type="error" message={loginError} />}
                <form onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Vaš email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Šifra
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}

                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="pt-8">
                    <Button type="submit" className="w-full py-3 text-lg">Uloguj se</Button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
    </section >
  );
}