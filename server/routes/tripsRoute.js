import express from "express";

import trips from "../controllers/TripsController";

const router = express.Router();


router.get("/",trips.allTrips);
router.get("/:trip_id", trips.individualTrip)
router.post("/", trips.newTrip);
router.patch("/:trip_id", trips.cancelTrip)
export default router;



