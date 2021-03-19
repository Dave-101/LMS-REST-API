const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/lms", {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true
}).then(() => {
    console.log("Connnection Successfull!!!");
}).catch(() => {
    console.log("No Connection!!!");
})