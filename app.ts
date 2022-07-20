import "dotenv/config";
import express, { Application, Request, Response, NextFunction } from "express";
import notionRouter from "./routes/notion";

const app: Application = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express");
});

app.use("/notion", notionRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
