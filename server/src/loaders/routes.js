const errorHandler = require("../middlewares/errorHandler.middleware");

module.exports = (app) => {
    app.get("/", (req,res) => {
        console.log("Routes Load successfully");
    });

    app.use(errorHandler);
}