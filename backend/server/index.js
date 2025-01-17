const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const userRouter = require("./routes/userRouter");
const connectDB = require("./database/db");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);

app.listen(port, () => {
  connectDB()
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("Database connection failed");
    });
  console.log(`Example app listening on port ${port}`);
});
