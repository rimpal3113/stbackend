// backend/src/server.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Routes
import adminRoutes from "../backend/src/routes/admin.js";
import teacherRoutes from "../backend/src/routes/teacher.js";
import studentRoutes from "../backend/src/routes/student.js";
import appointmentRoutes from "../backend/src/routes/appointment.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/appointments", appointmentRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ activeStatus: true, error: false, message: "Server is running" });
});

// Connect to MongoDB once (cold start)
if (!mongoose.connection.readyState) {
  mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ DB connection error:", err));
}

// ❌ Do NOT use app.listen()
// ✅ Export app for serverless
export default app;
