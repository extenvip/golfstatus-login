import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, time } = req.body;
    const logPath = path.join(process.cwd(), "log.txt");
    const logEntry = `${time} - Login: ${email}\n`;

    fs.appendFile(logPath, logEntry, (err) => {
      if (err) return res.status(500).json({ error: "Log failed" });
      res.status(200).json({ message: "Log saved" });
    });
  } else {
    res.status(405).end();
  }
}
