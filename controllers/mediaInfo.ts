import { Request, Response } from "express";
import getInfo from "../lib/getInfo";

export default async function mediaInfo(req: Request, res: Response) {
  const { id ,ss,ep} = req.query;
  const protocol = req.protocol; // 'http' or 'https'
  const host = req.get('host');  // e.g. 'localhost:3000'
  const origin = `${protocol}://${host}`;
  if (!id) {
    return res.json({
      success: false,
      message: "Please provide a valid id",
    });
  }
  try {
    const data = await getInfo(origin as string ,id as string ,ss as any,ep as any);
    res.json(data);
  } catch (err) {
    console.log("error: ", err);
    res.json({
      success: false,
      message: "Internal server error",
    });
  }
}
