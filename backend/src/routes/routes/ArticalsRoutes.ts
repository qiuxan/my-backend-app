import HttpStatusCodes from "@src/common/constants/HttpStatusCodes";
import { IReq, IRes } from "@src/routes/common/types";

async function getAll(_:IReq, res: IRes) {
  const articles = [{ id: 1, title: "Sample Article", content: "This is a sample article." }];
  res.status(HttpStatusCodes.OK).json({ articles });
}

export default {
  getAll
} as const;