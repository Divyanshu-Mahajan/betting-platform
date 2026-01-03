const sequelize = require("../config/database");

module.exports = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed", error?.message);
        process.exit(1);
    }
}