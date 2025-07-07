"use client";

import { useEffect, useState } from "react";
import customFetch from "@/utils/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Ticket {
  id: string;
  title: string;
  description?: string;
  status: string;
  category: string;
  createdAt: string;
}

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const router = useRouter();

  const fetchTickets = async () => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/");

    try {
      const res = await customFetch.get("/tickets/assigned", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTickets(res.data.tickets);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error || "Session expired. Please login again."
      );
      localStorage.removeItem("token");
      router.push("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem("token");
    try {
      await customFetch.patch(
        `/tickets/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Ticket status updated successfully!");
      // Refresh tickets after updating status
      fetchTickets();
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to update status.");
      console.log(err?.response?.data?.error || "Failed to update status.");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="flex justify-between items-center max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">My Assigned Tickets</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {tickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{ticket.title}</h2>
                    <p className="text-sm text-gray-600">{ticket.category}</p>
                    <p className="mt-2">{ticket.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Created: {new Date(ticket.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <select
                      value={ticket.status}
                      onChange={(e) => updateStatus(ticket.id, e.target.value)}
                      className="border px-2 py-1 rounded"
                    >
                      <option value="pending">pending</option>
                      <option value="open">open</option>
                      <option value="closed">closed</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
