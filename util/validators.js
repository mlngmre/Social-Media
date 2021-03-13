module.exports.validateRegisterInput=(
    username,
    email,
    password,
    confirmPassword
)=>{
    const errors = {};
    if(username.trim()===''){
        errors.username = "Username musn't be empty";
    }

    if(email.trim()===''){
        errors.email = "Email musn't be empty";
    }
    else{
        const regEx = /([A-Z])\w+/g;
        if(!email.match(regEx)){
            errors.email = "Email must be an valid email address";
        }
    }
    if(password === ''){
        errors.password = "Password mustn't be empty";
    }
    else if(password!==confirmPassword){
        errors.confirmPassword = "Password must match";
    }
    return {
        errors,
        valid:Object.keys(errors).length<1
    };
};
