import express from "express";
import prisma from "../db/prisma.js";

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user); // This should send the user object as-is, without modifying the date
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
