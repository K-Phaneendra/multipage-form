import "dotenv/config";
import app from "./src/server.js";

const port = process.env.PORT;

app.listen(port, () => console.log(`listening on port ${port} ... `));
