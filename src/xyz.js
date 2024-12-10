const app = require("app.js");
app.use("/user", (req, res) => {
    
    console.log("repsond return to console 1 ");
    res.send("respond");
});