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

exports.fetch = async (req, res, next) => {

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

exports.fetchUser = async (req,res,next) => {
    const user = req.body;
    Users.getOne({email:user.email}, (err, user_) => {

      if(err) res.json({
          error: err,
          code: 400,
          message: "User Not found"
      })

      const res = bcrypt.compare(user.password,user_.password);

      if (!res) res.json({
          error: err,
          code: 401,
          message: "Username or password do not match"
      })

      res.json({
          message: "User fetched successfully",
          code: 200,
          data: user_
      })
    })
}


exports.updateUser = async(req,res,next) => {
  const id = req.params.id;
  const updates = {};

  if (req.body.username) {
     updates.username = req.body.username;
  }

  if (req.body.name) {
     updates.name = req.body.name;
  }

  if (req.body.email) {
     updates.email = req.body.email;
  }

  if (req.body.password) {
    const hash_password = await bcrypt.hash(req.body.password,11)
     updates.password = hash_password;
  }

  Users.update({_id:id},updates,(err,user) => {
    if (err) res.json({
        error: err,
        code: 500,
        message: "Internal Server Error"
    })

    res.json({
        message: "User updated successfully",
        code: 200,
        data: user
    })
  })
}


exports.deleteUser = async (req,res,next) => {
  Users.remove({_id:req.params.id},(err,msg) => {
    if (err) res.json({
        error: err,
        code: 500,
        message: "Error deleting User"
    })

    res.json({
        message: "User deleted successfully",
        code: 200,
        data: msg
    })
  })
}
