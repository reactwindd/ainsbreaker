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
    let token = req.get("Authorization");
    if (!token) {
        return res.status(401).json({
            error: "Unauthorized",
        });
    }
    token = token.substring(7, token.length);
    const data = await getID(token);
    res.json(data);
});

router.get("/getBook", async (req: Request, res: Response) => {
    let token = req.get("Authorization");
    if (!token) {
        return res.status(401).json({
            error: "Unauthorized",
        });
    }
    token = token.substring(7, token.length);
    const data = await getBook(token);
    res.json(data);
});

export default router;
