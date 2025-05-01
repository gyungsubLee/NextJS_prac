import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  time: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const date = new Date();
  const time = date.toLocaleTimeString();
  res.status(200).json({ time });
}
