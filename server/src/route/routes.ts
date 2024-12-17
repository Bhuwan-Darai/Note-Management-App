/**
 * Express router configuration
 */
import express from "express";
import { addUser } from "../controller/controller";
const router = express.Router();

/**
 * GET /hello
 * Returns a simple hello world message
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Object} JSON response with hello message
 */
router.get("/hello", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

router.post("/addUser", addUser);

export default router;
