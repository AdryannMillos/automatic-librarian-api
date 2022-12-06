const app = require("./app.js");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));