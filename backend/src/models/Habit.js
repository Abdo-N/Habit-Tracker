import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    completedDays: {
        type: [String], // Array of strings representing completed days
        default: [],
    },
    color: {
        type: String,
        required: true,
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,  // MongoDB's ID type
    ref: "User",                            // tells Mongoose "this points to a User"
    required: true                          // every habit MUST belong to someone
  }
},
  {
    timestamps: true, //created at, or updated at
  }
);

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
