import express, { Request, Response } from "express";
import route from "./api/route";
import "dotenv/config";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.use("/api", route);

app.use("*", (req: Request, res: Response) => {
    res.status(404).json({ error: "not found" });
});
