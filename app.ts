import "dotenv/config";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import notionRouter from "./routes/notion";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the shack!");
});

app.use(cors());

app.use("/notion", notionRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));
