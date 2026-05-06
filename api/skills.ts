import { skills } from "./_data";

export default function handler(_req: any, res: any) {
  res.status(200).json(skills);
}