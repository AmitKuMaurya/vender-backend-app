const bcrypt = require("bcrypt");
require('dotenv').config();
const JWT = require("jsonwebtoken");
const UserModel = require("../model/user.model");

exports.register = async(req,res,next) => {
    const { email, password , role} = req.body;

    if(email === 'amit69maurya69@gmail.com'){
        role === "ADMIN"
        next();
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const register = await UserModel.create({
        email,
        password : hashedPassword,
        role
    });

    const token =  JWT.sign({ userID : register._id, email : register.email }, process.env.JWTSECRET,{
        expiresIn : "10min",
        algorithm : "HS256"
    })

    res.status(201).send({
        msg : "User registered",
        token : token
    });
}

exports.login = async(req,res,next) => {
    const { email, password , role} = req.body;

    const user = await UserModel.findOne({email : email});

    if(!user || !password) return next('User does not exits !!');
    console.log(user.password,"Consoling passowrd");
    const compare = await bcrypt.compare(password,user.password);
    console.log(compare,"Consoling compare here !!");

    if(!compare) return next(`CREDENTIALS ARE NOT VALID !!`);

    if(compare) {
        const token =  JWT.sign({ userID : user._id, email : user.email},process.env.JWTSECRET,{
            expiresIn : "10min",
            algorithm : "HS256"
        })
        
        res.status(201).send({
            msg : "User Logged-in !!!",
            token : token
        });
    } else {
        res.status(501).send({ error : `Internal Server Problem`});
    }
}

exports.allUsers = async(req,res)=> {
    const users = await UserModel.find();
    if(users.length < 0) {
        res.status(201).send({
            msg : "User Array is Empty !!",
        });
    }
    res.status(201).json({
        msg : "User Fetched !!!",
        users : users
    });
}

