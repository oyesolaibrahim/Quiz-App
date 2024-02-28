const User = require("../models/user.model"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignupPage = (req, res) => {
    res.status(200).json({message: "user_signup successful"});
}

const addUser = (req, res) => {
    
    User.findOne({email: req.body.email})
    .then(user => {
        if (user) {
         return  res.status(404).json ({message: "A User with the same email address already exist."});
            //req.flash("error", "A User with the same email address already exists.");
         //   req.flash("formData", req.body);
           // return res.redirect("/signup");
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
        //console.log(user);
        res.status(200).json({message: "created successfully"});
    //    res.redirect("/user/login");
    })
    .catch((err) => {
        res.status(404).json({message: "error", err});
        //req.flash("error", error._message);
        //req.flash("formData", req.body);
        //return res.redirect("/signup");
        })
      
    })
    .catch((error) => {
        res.status(404).json({message: "error finding email", error});
      //  req.flash("error", error._message);
      //  req.flash("formData", req.body);
      //  return res.redirect("/signup");
    })
    }


/*const userLoginPage = (req, res) => {
    res.render("user_login", {error: req.flash("error"), form: req.flash("formData")});
}*/

const userLogin = (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(404).json({message: "Email and password are required."});
        //req.flash("formData", req.body);
        //return res.redirect("/user/login");
    }

    User.findOne({email})
    .then((user) => {
        const userObj = {id: user._id};
        const token = jwt.sign(userObj, "SECRET_KEY");
        console.log(user);
        if (!user) {
            return res.status(404).json({message: "User account with the given email does not exist."});
          //  req.flash("formData", req.body);
            //return res.redirect("/user/login");            
        } else if (!bcrypt.compareSync(password, user.password)) {
           return res.status(404).json({message: "Incorrect Password."});
         //   req.flash("formData", req.body);
        }
        res.status(200).json({message: "Logged In", token});
    })
    .catch(error => {
        res.status(404).json({message: "error", error});
    })
}

/*
const userProfilePage = (req, res) => {
    User.findOne({_id: req.session.userId})
    .then((admin) => {
        menu.find({user: req.session.adminId})
        .then((menus) => {
            res.render("user_profile", {profile: admin, menus});
        })
        .catch(error => {
           req.flash("error", error._message);
           return res.redirect("/user/login");
        })
    })
    .catch(error => {
       req.flash("error", error._message);
       return res.redirect("/user/login"); 
    })
}

const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    })
}*/

module.exports = {
    userSignupPage,
    addUser,
    userLogin
   // userLoginPage,
   // userProfilePage,
   // logout
}