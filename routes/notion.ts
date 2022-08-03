import "dotenv/config";
import express, { Response } from "express";
import { Client } from "@notionhq/client";

const router = express.Router();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

router.get("/students", async (req, res: Response) => {
  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_STUDENTS_DB!,
    sorts: [
      { property: "학년", direction: "ascending" },
      { property: "학급", direction: "ascending" },
      { property: "이름", direction: "ascending" },
    ],
  });

  const studentList = results.map((result: any, idx: number) => {
    if ("properties" in result) {
      return {
        id: idx,
        grade: result.properties.학년.rich_text[0]?.plain_text || null,
        group: result.properties.학급.rich_text[0]?.plain_text || null,
        name: result.properties.이름.title[0]?.plain_text || null,
        gender: result.properties.성별.select?.name || null,
        birth: result.properties.생년월일.date?.start || null,
        phone: result.properties.연락처.rich_text[0]?.plain_text || null,
        teacher: result.properties.교사.rich_text[0]?.plain_text || null,
        address: result.properties.주소.rich_text[0]?.plain_text || null,
      };
    }
    return {};
  });
  res.send(studentList);
});

router.get("/teachers", async (req, res: Response) => {
  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_TEACHERS_DB!,
    sorts: [
      //
      { property: "이름", direction: "ascending" },
    ],
  });

  const teacherList = results.map((result: any, idx: number) => {
    if ("properties" in result) {
      return {
        id: idx,
        grade: result.properties.학년.select?.name || null,
        group: result.properties.학급.rich_text[0]?.plain_text || null,
        name: result.properties.이름.title[0]?.plain_text || null,
        role: result.properties.역할.select?.name || null,
      };
    }
    return {};
  });
  res.send(teacherList);
});

export default router;
