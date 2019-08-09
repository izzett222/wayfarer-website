import express from "express";

import trips from "../controllers/TripsController";
import autho from "../middleware/authorization/autho";
import admin from "../middleware/authorization/admin";

const router = express.Router();

router.get("/", autho, trips.allTrips);
router.get("/:trip_id", autho, trips.individualTrip);
router.post("/", [autho, admin], trips.newTrip);
router.patch("/:trip_id/cancel", [autho, admin], trips.cancelTrip);
export default router;
