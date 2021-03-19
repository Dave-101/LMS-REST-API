//Requiring all the neccessary things

const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 3000;
// const session = require("express-session");
const bodyParser = require('body-parser');

// Connecting with database

require("../src/db/conn");
const Book = require("./models/books");
const UserStudent = require("./models/user-student");
const UserAdmin = require("./models/user-admin");
const Record = require("./models/records");
const Payment = require("./models/payment");
// const { Session } = require("inspector");

// Connecting to the paths

const staticpath = path.join(__dirname, "../public");
const template_path = path.join(__dirname,"/views");

// Setting handlebars

app.set("view engine","hbs");
app.set("views", template_path);

// console.log(staticpath);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(staticpath))
app.use(express.json());

// students after logging in

app.post("/student", async (req, res) => {
    try{
        const name = req.body.username;
        const password = req.body.password;
        const userdata = await UserStudent.findOne({password:password});
        if(password == userdata.password && name == userdata.name){
            res.send(`Welcome, ${name}! You can now check your payment status, search books etc...`);
        }else{
            res.status(400).send("Password or username is wrong!!!");
        }
    }catch(err){
        res.status(400).send("Password or Username is wrong!");
    }
})

// Admins after logging in

app.post("/admin", async (req, res) => {
    try{
        const name = req.body.username;
        const password = req.body.userpassword;
        const userdata = await UserAdmin.findOne({password:password});
        if(password == userdata.password && name == userdata.name){
            res.send(`Welcome, ${name}! you can insert, delete , update, read any details you want as per requirement`);
        }else{
            res.status(400).send("Password or username is wrong!!!");
        }
    }catch(err){
        res.status(400).send("Password or Username is wrong!");
    }
})

// Creating book post,get,path and delete

app.post("/books", async(req, res) => {
    try{
        const book = new Book(req.body);
        const await_book = await book.save();
        res.status(201).send(await_book);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
})

// Get all books

app.get("/books", async(req, res) => {
    try{
        const getbooks = await Book.find();
        res.send(getbooks);
    }
    catch(err){
        res.status(400).send(err);
    }
})

// Get a book by it's isbn

app.get("/books/:isbn", async(req, res) => {
    try{
        const isbnNo = req.params.isbn;
        // res.send(isbnNo);
        const getbookbyisbn = await Book.findOne({isbn: isbnNo});
        if(!getbookbyisbn){
            return res.status(404).send();
        }else{
            res.send(getbookbyisbn);
        }
    }
    catch(err){
        res.send(err);
    }
})

// update book details by it's isbn

app.patch("/books/:isbn", async (req, res) => {
    try{
        const isbnNo = req.params.isbn;
        const updateBook = await Book.findOneAndUpdate({isbn: isbnNo},req.body,{
            new: true
        });
        if(!updateBook){
            return res.status(404).send();
        }else{
            res.send(updateBook);
        }
    }catch(err){
        res.status(404).send(err);
    }
})

// Delete book by book isbn

app.delete("/books/:isbn", async (req, res) =>{
    try{
        const isbnNo = req.params.isbn;
        const deleteBook = await Book.findOneAndDelete({isbn: isbnNo});
        if(!deleteBook){
            res.status(404).send()
        }else{
            res.send(deleteBook);
        }
        
    }catch(err){
        res.status(500).send(err);
    }
});

// End of book creation

// Creating student's post, get, path and delete operations

app.post("/user-student", async(req, res) => {
    try{
        const student = new UserStudent(req.body);
        const await_student = await student.save();
        // console.log(await_student);
        res.status(201).send(await_student);
    }
    catch(err){
        res.status(400).send(err);
    }
})

// Get user details

app.get("/user-student", async(req, res) => {
    try{
        const getstudents = await UserStudent.find();
        res.send(getstudents);
    }catch(err){
        res.send(err);
    }
})

// Get user details by id

app.get("/user-student/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        // res.send(isbnNo);
        const getstudentsbyid = await UserStudent.findOne({_id:_id});
        if(!getstudentsbyid){
            return res.status(404).send();
        }else{
            res.send(getstudentsbyid);
        }
    }
    catch(err){
        res.status(404).send(err);
    }
})

// update user details by id

app.patch("/user-student/:id", async (req, res) => {
    try{
        const _id = req.params.id;
        const updatestudentdetails = await UserStudent.findOneAndUpdate({_id: _id},req.body,{
            new: true
        });
        if(!updatestudentdetails){
            return res.status(404).send();
        }else{
            res.send(updatestudentdetails);
        }
    }catch(err){
        res.status(404).send(err);
    }
})

// Delete user by his/her id

app.delete("/user-student/:id", async (req, res) =>{
    try{
        const _id = req.params.id;
        const deleteUser = await UserStudent.findByIdAndDelete(_id);
        if(!deleteUser){
            res.status(400).send()
        }else{
            res.send(deleteUser);
        }
        
    }catch(err){
        res.status(500).send(err);
    }
});


// add admin details

app.post("/user-admin", async(req, res) => {
    try{
        const admin = new UserAdmin(req.body);
        const await_admin = await admin.save();
        // console.log(await_student);
        res.status(201).send(await_admin);
    }
    catch(err){
        res.status(400).send(err);
    }
})

// Get admin details

app.get("/user-admin", async(req, res) => {
    try{
        const getadmins = await UserAdmin.find();
        res.send(getadmins);
    }catch(err){
        res.send(err);
    }
})

// Get admin details by id

app.get("/user-admin/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        // res.send(isbnNo);
        const getadminsbyid = await UserAdmin.findOne({_id:_id});
        if(!getadminsbyid){
            return res.status(404).send();
        }else{
            res.send(getadminsbyid);
        }
    }
    catch(err){
        res.status(404).send(err);
    }
})

// update user details by id

app.patch("/user-admin/:id", async (req, res) => {
    try{
        const _id = req.params.id;
        const updateadmindetails = await UserAdmin.findOneAndUpdate({_id: _id},req.body,{
            new: true
        });
        if(!updateadmindetails){
            return res.status(404).send();
        }else{
            res.send(updateadmindetails);
        }
    }catch(err){
        res.status(404).send(err);
    }
})


// record creation

app.post("/records", async(req, res) => {
    try{
        const student_name = req.body.studentname;
        const student_email = req.body.studentemail;  
        const getdata = await UserStudent.findOne({email: student_email});
        
        if(getdata == null){
            res.status(404).send({msg: "Email id doesn't match"});
        }

        if(student_email === getdata.email && student_name === getdata.name){
            // res.send(getdata);
            const record = new Record(req.body);
            const await_record = await record.save();
            res.send(await_record);
        }
        else{
            res.send({Error: "This student is not registered in the system!!!"});
        }
    }
    catch(err){
        res.status(404).send(err);
    }
})

// Get records

app.get("/records", async(req, res) => {
    try{
        const getrecords = await Record.find();
        res.send(getrecords);
    }catch(err){
        res.status(400).send(err);
    }
})

// Get records by id

app.get("/records/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        // res.send(isbnNo);
        const getrecordbyid = await Record.findOne({_id:_id});
        if(!getrecordbyid){
            return res.status(404).send();
        }else{
            res.send(getrecordbyid);
        }
    }
    catch(err){
        res.status(404).send(err);
    }
})

// update record by record id

app.patch("/record/:id", async (req, res) => {
    try{
        const _id = req.params.id;
        const updateRecord = await Record.findOneAndUpdate({_id: _id},req.body,{
            new: true
        });
        if(!updateRecord){
            return res.status(404).send();
        }else{
            res.send(updateRecord);
        }
    }catch(err){
        res.status(404).send(err);
    }
})

// Delete a record by id

app.delete("/record/:id", async (req, res) =>{
    try{
        const _id = req.params.id;
        const deleteRecord = await Record.findByIdAndDelete(_id);
        if(!deleteRecord){
            res.status(404).send({Error: "Record is not available"});
        }else{
            res.send(deleteRecord);
        }
    }catch(err){
        res.status(500).send(err);
    }
});

// insert payment

app.post("/payments", async(req, res) => {
    try{
        const student_name = req.body.studentname;
        const student_email = req.body.studentemail;  
        const getdata = await UserStudent.findOne({email: student_email});
        
        if(getdata == null){
            res.status(404).send({msg: "Email id doesn't match"});
        }

        if(student_email === getdata.email && student_name === getdata.name){
            // res.send(getdata);
            const payment = new Payment(req.body);
            const await_payment = await payment.save();
            res.send(await_payment);
        }
        else{
            res.send({Error: "This student is not registered in the system!!!"});
        }
    }
    catch(err){
        res.status(404).send(err);
    }
})

// Get  payments

app.get("/payments", async(req, res) => {
    try{
        const getpayments = await Payment.find();
        res.send(getpayments);
    }catch(err){
        res.status(400).send(err);
    }
})

// Get payment by id

app.get("/payments/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        // res.send(isbnNo);
        const getpaymentbyid = await Payment.findOne({_id:_id});
        if(!getpaymentbyid){
            return res.status(404).send();
        }else{
            res.send(getpaymentbyid);
        }
    }
    catch(err){
        res.status(404).send(err);
    }
})

// update record by record id

app.patch("/payments/:id", async (req, res) => {
    try{
        const _id = req.params.id;
        const updatePayment = await Payment.findOneAndUpdate({_id: _id},req.body,{
            new: true
        });
        if(!updatePayment){
            return res.status(404).send();
        }else{
            res.send(updatePayment);
        }
    }catch(err){
        res.status(404).send(err);
    }
})

// Delete a payment by id

app.delete("/payments/:id", async (req, res) =>{
    try{
        const _id = req.params.id;
        const deletePayment = await Payment.findByIdAndDelete(_id);
        if(!deletePayment){
            res.status(404).send({Error: "Record is not available"});
        }else{
            res.send(deletePayment);
        }
    }catch(err){
        res.status(500).send(err);
    }
});

//  For running the server
app.listen(port, () => {
    console.log("Running at port ", port);
})
