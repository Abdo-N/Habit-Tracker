import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

//function to create the JWT token
export function generateToken (_id){
  return jwt.sign(
    { _id }, //payload you want to use (no senstive data allowed)
    process.env.SECRET_KEY, // a secret random string, complicated the better
    { expiresIn: "3d" } //expire the token in 3 days once authenticated
  );
};

export async function login(req, res)
{
    console.log("Logging in...");
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = generateToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function signup(req, res)
{
    console.log("Signing up...");
    const { email, password } = req.body;
    try {
        // "User" is our schema created and we can access the statics functions
        // and also perform the database operations (findOne, updateMany etc.,)
        const user = await User.signup(email, password);
        console.log('Generating token now...');
        const token = generateToken(user._id);
        console.log('Token generated = '+token);
        res.status(201).json({ email, token });  //send back email and token
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
