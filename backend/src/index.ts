import express from "express";
import { logRequestDetails } from "./middleware";
import userRouter from "./routes/users";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  function (req, res, next) {
    console.log("middleware 1");
    next();
  },
  function (req, res, next) {
    console.log("middleware 2");
    next();
  }
);

app.get("/", (req, res) => {
  res.json({ message: "Hello from TypeScript Node.js backend!" });
});

app.get(
  "/health",
  (req, res, next) => {
    console.log("health check middleware");
    next();
  },
  logRequestDetails,
  (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
  }
);

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
