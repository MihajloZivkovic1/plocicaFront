"use client"
import { getSession, login, logout } from "../../lib";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";


export default function Page() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: "", password: "" });

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
      await login(form);
      router.push("/");
    } catch (err: any) {
      setLoginError("Invalid credentials, user not found");
    }
  };

  return (
    <section>
      <>
        <div>
          <section className="flex items-center justify-center height-for-form">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg dark:border dark:bg-gray-800 dark:border-gray-700">
              <div className="p-8 space-y-6">
                <a
                  href="#"
                  className="flex items-center mb-8 text-3xl font-semibold text-gray-900 dark:text-white"
                >
                  <img
                    className="w-10 h-10 mr-3"
                    src="https://picsum.photos/seed/picsum/200/300"
                    alt="logo"
                  />
                  MemoryPlate
                </a>
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                  Sign in to your account
                </h1>
                {loginError && <p className="text-red-500">{loginError}</p>}
                <form onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
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
                      Password
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
                    <Button className="w-full py-3 text-lg">Log in</Button>
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