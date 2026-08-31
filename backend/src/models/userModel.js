/** --- userModel.js. --- **/
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

//get the schema object in order to create the schema
const Schema = mongoose.Schema

//create the schema with email and password
const userSchema = new Schema({
  email: {
    type: String,
    required: true, // will not register until you provide an email
    unique: true,  //will throw error if same email is used to signup
  },
  password: {
    type: String,
    required: true,
  },
},
{ timestamps: true } // will automatically create createdAt and updatedAt fields
);

// do not use arrow functions as we need to use "this" keyword inside
userSchema.statics.signup = async function (email, password) {
  //Step 1. Validation
  if (!email || !password) {
    throw Error("One or more fields are empty");  //we will handle these errors in frontend
  }
  //here we use validator package to easily check the email & password
  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email address");
  }
  // if (!validator.isStrongPassword(password)) {
  //   throw Error("Password is not strong enough");
  // }
  
  //Step 2. Email exists or not?
  const exist = await this.findOne({ email });
  //we have the database instace, so we can use "this" and 
  //perform any database related operations (findOne, deleteMany etc.,) 

  if (exist) {
    throw Error("Email address already exists");
  }

  //Step 3. Create salt 
  const salt = await bcrypt.genSalt(10);

  //Step 4. Create hash of password + salt and finally insert it in DB
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });
  
  return user;
};

userSchema.statics.login = async function(email, password) {
    //Step 1. Validate the credentials
    if(!email || !password){
        throw Error("One or more fields are empty");
    }
    
    //Step 2. Find the email in the DB
    const user = await this.findOne({email});

    if(!user){
        throw Error('Looks like the email address is not registered');
    }
    
    //Step 3. Match the passwords
    const match = await bcrypt.compare(password, user.password);

    if(!match) throw Error('Incorrect Password');
    
    //Step 4. Return the user if password is correct    
    return user;
}


//create the modal using schema like this. "user" will be converted to plural 
// i,e "users" when MongoDB will create a collection.   
const User = mongoose.model("User", userSchema);
export default User;