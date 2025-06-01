"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isDirective } from "../middlewares/authorization.middleware.js";
import{
    createMeeting,
    getMeeting,
    getMeetings,
    deleteMeeting,
    updateMeeting,
}from "../controllers/meeting.controller.js"

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

router
  .post("/", createMeeting)
  .get("/", getMeetings)
  .get("/detail/", getMeeting)
  .delete("/detail/", deleteMeeting)
  .patch("/detail/",updateMeeting);
export default router;