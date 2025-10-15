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


// get one article by id
async function getOne(req: IReq, res: IRes) {
  const { id } = req.params;
  // Implementation for getting an article by id
  res.status(HttpStatusCodes.OK).json({ article: { id, title: "Sample Article", content: "This is a sample article." } });
}



export default {
  getAll,
  add,
  getOne
} as const;