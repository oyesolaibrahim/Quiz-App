const Admin = require("../models/admin.model"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");



const addAdmin = (req, res) => {   
    Admin.findOne({email: req.body.email})
    .then(admin => {
        if (admin) {
            return  res.status(404).json("error", "An admin with the same email address already exists.");
        }
        
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const adminData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword
    }
    Admin.create(adminData)
    .then((admin) => {
        res.status(200).json({message: "created successfully"});;
    })
    .catch((err) => {
        res.status(404).json({message: "error", err});
    })
    })
    .catch((error) => {
        res.status(404).json({message: "error finding email", error});
    })
}


const login = (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(404).json({message: "Email and password are required."});
    }

    Admin.findOne({email})
    .then((admin) => {
        const adminObj = {id: admin._id};
        const token = jwt.sign(adminObj, "SECRET_KEY");

        if (!admin) {
            return res.status(404).json({message: "Admin account with the given email does not exist."});
        } else if (!bcrypt.compareSync(password, admin.password)) {
            return res.status(404).json({message: "Incorrect Password."});
        }
        
        
        res.status(200).json({message: "Logged In", token, admin});
    })
    .catch(error => {
        res.status(404).json({message: "Admin account not found", error});
    })
}

module.exports = {
    addAdmin,
    login
}