"use client";

import customFetch from "@/utils/axios";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CreateTicket() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await customFetch.post("/tickets", form);
      toast.success("Ticket Submitted successfully!");
      setForm({ title: "", description: "", category: "" });
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.error || "Something went wrong");
      console.log(err?.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Create a Ticket</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="mb-4 w-full px-4 py-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Describe your logging"
          rows={4}
          value={form.description}
          onChange={handleChange}
          className="mb-4 w-full px-4 py-2 border rounded resize-none"
          required
        />

        <select
          name="category"
          value={form.category}
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

        <button
          type="submit"
          className="flex justify-center gap-4 bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Submit Ticket"
          )}
        </button>
      </form>
    </div>
  );
}
