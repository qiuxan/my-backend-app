import HttpStatusCodes from "@src/common/constants/HttpStatusCodes";
import { IReq, IRes } from "@src/routes/common/types";

async function getAll(_:IReq, res: IRes) {
  const articles = [{ id: 1, title: "Sample Article", content: "This is a sample article." }];
  res.status(HttpStatusCodes.OK).json({ articles });
}

async function add(req: IReq, res: IRes) {

  console.log({ body: req.body });
  // Implementation for adding an article
  res.status(HttpStatusCodes.CREATED).json({  message: "Article added successfully" });
}

export default {
  getAll,
  add
} as const;