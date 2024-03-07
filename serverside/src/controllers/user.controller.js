const User = require("../models/user.model"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const addUser = (req, res) => {
    
    User.findOne({email: req.body.email})
    .then(user => {
        if (user) {
         return  res.status(404).json ({message: "A User with the same email address already exist."});
        }
        
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword
    }
  
    User.create(userData)
    .then((user) => {
        res.status(200).json({message: "created successfully"});
    })
    .catch((err) => {
        res.status(404).json({message: "error", err});
        })
      
    })
    .catch((error) => {
        res.status(404).json({message: "error finding email", error});
    })
    }


const userLogin = (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(404).json({message: "Email and password are required."});
    }

    User.findOne({email})
    .then((user) => {
        const userObj = {id: user._id};
        const token = jwt.sign(userObj, "SECRET_KEY");
        console.log(user);
        if (!user) {
            return res.status(404).json({message: "User account with the given email does not exist."});
        } else if (!bcrypt.compareSync(password, user.password)) {
           return res.status(404).json({message: "Incorrect Password."});
        }
        res.status(200).json({message: "Logged In", token, user});
    })
    .catch(error => {
        res.status(404).json({message: "User account not found", error});
    })
}


module.exports = {
    addUser,
    userLogin
}