"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import meetingRoutes from "./meeting.routes.js";
import authRoutes from "./auth.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/meeting",meetingRoutes);
export default router;