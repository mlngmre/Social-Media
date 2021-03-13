const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../../config');
const {UserInputError}= require('apollo-server');
const validateRegisterInput = require('../../util/validators');

module.exports = {
    Mutation:{
      async  register(_,{registerInput:{username,email,password,confirmPassword}
        },
        ){
            //1.VALIDATE USER DATA
            const {valid,errors}= validateRegisterInput(username,email,password,confirmPassword);
            if(!valid){
                throw new UserInputError('Errors',{erros});
            }

            //2. User doesn't already exists
            const user = await User.findOne({username});
            if(user){
                throw new UserInputError('Username is taken',{
                    errors:{
                        username:'This username is taken'
                    }
                });
            }
            //3. Hash password and create an auth token
            password = await bcrypt.hash(password,12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt:new Date().toISOString()
            });

            const res = await newUser.save();

            const token = jwt.sign({
                id:res.id,
                email:res.email,
                username:res.username
            }, SECRET_KEY,{expiresIn:'1h'});
            return{
                ...res._doc,
                id:res._id,
                token
            };
        }
    }
};