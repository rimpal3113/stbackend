import dotenv from "dotenv";
import express from "express";
import connectDB from "./utils/db.js";

import adminRoutes from "./routes/admin.js";
import teacherRoutes from "./routes/teacher.js";
import studentRoutes from "./routes/student.js";
import appointmentRoutes from "./routes/appointment.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send({ activeStatus: true, error: false });
});

// Connect to DB once
connectDB().catch((err) => {
  console.error("❌ Failed to connect to database:", err);
});

// 🚫 No app.listen()
// ✅ Export for Vercel
export default app;
