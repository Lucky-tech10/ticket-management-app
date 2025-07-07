"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl text-center"
      >
        <h1 className="text-3xl font-bold text-blue-800 mb-4">
          Ticket Management System
        </h1>
        <p className="text-gray-600 text-base mb-8">
          A lightweight system to handle support tickets by category with admin
          assignment and tracking.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => router.push("/create-ticket")}
            className="w-48 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Submit Ticket
          </button>
          <button
            onClick={() => router.push("/login")}
            className="w-48 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Admin Portal
          </button>
        </div>
      </motion.div>
    </main>
  );
}
