import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/utils/db.js";

import adminRoutes from "./src/routes/admin.js";
import teacherRoutes from "./src/routes/teacher.js";
import studentRoutes from "./src/routes/student.js";
import appointmentRoutes from "./src/routes/appointment.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send({ activeStatus: true, error: false });
});

// DB connect only once
connectDB().catch((err) => {
  console.error("❌ Failed to connect to database:", err);
});

// ❌ Do not use app.listen() here
// ✅ Export app for Vercel
export default app;
