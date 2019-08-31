const Users = require('./users.dao');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res, next) => {
    const user = req.body;

    const hash_password = await bcrypt.hash(user.password, 11);
    const user_ = {
        name: user.name,
        email: user.email,
        username: user.username,
        password: hash_password
    }

    Users.create(user_,(err,data) => {
        if(err) res.json({
            error: err,
            code: 500,
            message: "Internal Server error"
        })

        res.json({
            message: "User created successfully",
            code: 201,
            data:  data
        })
    })
}

exports.fetch = (req, res, next) => {

    Users.get({},(err,users)=> {

        if(err) res.json({
            error: err,
            code: 500,
            message: "Internal Server error"
        })

        res.json({
            message: "Users fetched successfully",
            code: 200,
            data:  users
        })
    })
}

exports.fetchUser = (req,res,next) => {
    
    Users.getOne()
}