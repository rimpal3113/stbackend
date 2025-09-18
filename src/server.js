import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";

import adminRoutes from "./routes/admin.js";
import teacherRoutes from "./routes/teacher.js";
import studentRoutes from "./routes/student.js";
import appointmentRoutes from "./routes/appointment.js";

dotenv.config();

const app = express();

// 🔹 Middlewares
app.use(cors({
  origin: [
    "http://localhost:5173",          // local dev
    "https://forfrontend-mzzt.vercel.app" // deployed frontend
  ],
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// 🔹 Routes
app.use("/api/admin", adminRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/appointments", appointmentRoutes);

// 🔹 Health check
app.get("/", (req, res) => {
  res.status(200).json({
    activeStatus: true,
    error: false,
    message: "🚀 Backend is running successfully"
  });
});

// 🔹 Connect to DB (once)
connectDB().catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
});

// ❌ Do not use app.listen() here
// ✅ Export for Vercel
export default app;
