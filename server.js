const express = require("express");
const app = express();
const port = 2006;
const cors = require("cors");
const {} = require("sequelize")

const corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
app.use(express.json());

const db = require("./app/util/db");
const models = require("./app/models/relations/relations");

sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

require("./app/routers/router")(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})
