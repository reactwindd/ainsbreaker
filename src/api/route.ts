import express, { Request, Response } from "express";
import { getID, getBook } from "./util";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
router.use(express.json());

router.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Hello World!",
    });
});

router.get("/getid", async (req: Request, res: Response) => {
    const data = await getID();
    res.json(data);
});

router.get("/getBook", async (req: Request, res: Response) => {
    const data = await getBook();
    res.json(data);
});

export default router;
