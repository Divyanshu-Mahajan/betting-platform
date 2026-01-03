module.exports = (app) => {
    app.get("/", (req,res) => {
        console.log("Routes Load successfully");
    });
}