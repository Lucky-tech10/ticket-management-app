"use client";

import { useState } from "react";
import customFetch from "@/utils/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [isAmember, setIsAmember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    category: "",
  });
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { email } = formData;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setLoading(true);

    try {
      if (isAmember) {
        const res = await customFetch.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", res.data.token);
        toast.success("Logged in successfully!");
        router.push("/dashboard");
      } else {
        await customFetch.post("/auth/register", formData);
        toast.success("Registered successfully! You can now login.");
        setIsAmember(true);
      }
    } catch (err: any) {
      localStorage.removeItem("token");
      console.log(err);
      toast.error(err?.response?.data?.error || "Something went wrong");
      console.log(err?.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isAmember ? "Admin Login" : "Admin Register"}
            </h2>

            {!isAmember && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mb-4 w-full px-4 py-2 border rounded"
                  required
                />
              </>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="mb-4 w-full px-4 py-2 border rounded"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="mb-4 w-full px-4 py-2 border rounded"
              required
            />

            {!isAmember && (
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mb-4 w-full px-4 py-2 border rounded"
              >
                <option value="">Select category...</option>
                <option value="IT">IT</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Support">Support</option>
                <option value="Cashier">Cashier</option>
                <option value="Billing">Bills</option>
              </select>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex justify-center gap-4 bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isAmember ? (
                "Login"
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          {isAmember ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsAmember(!isAmember)}
            className="text-blue-600 cursor-pointer underline"
          >
            {isAmember ? "Register" : "Login"}
          </span>
        </p>

        <p className="mt-2 text-center text-sm">
          <a href="/create-ticket" className="text-gray-600 underline">
            Submit a support ticket instead
          </a>
        </p>
      </div>
    </div>
  );
}
