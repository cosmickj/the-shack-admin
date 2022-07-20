import "dotenv/config";
import express, { Response } from "express";
import { Client } from "@notionhq/client";

const router = express.Router();

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_STUDENTS_DB;

router.post("/students", async (req, res: Response) => {
  if (!databaseId) return;

  const rows = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: "grade",
        direction: "ascending",
      },
      {
        property: "group",
        direction: "ascending",
      },
      {
        property: "name",
        direction: "ascending",
      },
    ],
  });

  const studentList = rows.results.map((row: any) => {
    return {
      name: row.properties.name.title[0].text.content,
      grade: row.properties.grade.number,
      group: row.properties.group.number,
      teacher: row.properties.teacher.rich_text[0].text.content,
    };
  });
  res.send(studentList);
});

export default router;
