import { app } from "./config/express";
import config from "./config/vars";

app.get("/parsing", (req, res) => {
  res.render("parsing");
});
app.listen(config.port, () => {
  console.log(
    `APP is running on http://localhost:${config.port} in ${config.env}`
  );
});

export default app;
