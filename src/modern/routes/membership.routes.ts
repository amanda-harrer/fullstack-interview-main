import express, { Request, Response } from "express";
import {
  createMembership,
  listMemberships,
} from "../services/membershipService";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const data = listMemberships();
  return res.status(200).json(data);
});

router.post("/", (req: Request, res: Response) => {
  const result = createMembership(req.body);

  if ("error" in result) {
    return res.status(400).json({ message: result.error });
  }

  return res.status(201).json(result);
});

export default router;
