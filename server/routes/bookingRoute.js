import express from "express";
import bookings from "../controllers/BookingController";
import autho from "../middleware/authorization/autho";
import admin from "../middleware/authorization/admin";

const router = express.Router();
router.get("/", [autho, admin], bookings.allBookings);
router.post("/", autho, bookings.book);
router.get("/:user_id", autho, bookings.userBookings);
router.delete("/:id", autho, bookings.deleteBooking);
export default router;
