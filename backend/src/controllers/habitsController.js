import Habit from "../models/Habit.js"

//createHabit, getAllHabits, deleteHabit, editHabit, toggleHabit

export async function createHabit(req, res) {
    try {
    const {name, icon, color, completedDays} = req.body;
    const habit = new Habit({ 
      name, 
      icon, 
      color, 
      user: req.userId,
      completedDays });

    const savedHabit = await habit.save();
    res.status(201).json(savedHabit);
  }
  catch (error) {
    console.error("Error creating Habit:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllHabits(req, res) {
    try{
    
        const habits = await Habit.find({ user: req.userId }).sort({createdAt:-1});
        res.status(200).json(habits);
    
    } catch (error) {
        
        console.error("Error fetching habits:", error);
        res.status(500).json({ message: "Internal server error" });
    
    }
}

export async function deleteHabit(req, res) {
     try {

    const deletedHabit = await Habit.findOneAndDelete({ _id: req.params.id, user: req.userId });

    if(!deletedHabit)
    {
      return res.status(404).json({message:"Habit not found"});
    }

    res.status(200).json(deletedHabit);

  } catch (error) {
    console.error("Error deleting Habit:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function editHabit(req, res) {
    try
    {
        const { name, icon, color } = req.body;
        const updatedHabit = await Habit.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        { name, icon, color },
        { new: true }
        );
        if(!updatedHabit)
        {
            return res.status(404).json({message:"Habit not found"});
        }
        
        res.status(200).json(updatedHabit);
    } catch (error) {
        console.error("Error editing Habit:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function toggleHabit(req, res) {
    try {
      
        const  updatedHabit = await Habit.findOne({ _id: req.params.id, user: req.userId });

        if(!updatedHabit)
        {
            return res.status(404).json({message:"Habit not found"});
        }

        const targetDate = req.params.day ? req.params.day : new Date().toISOString().split("T")[0];

        // Toggle the habit for the specified day
        if(updatedHabit.completedDays.includes(targetDate))
        {
          // Remove the day from completedDays
          updatedHabit.completedDays = updatedHabit.completedDays.filter(day => day !== targetDate);
        }
        else
        {
          // Add the day to completedDays
          updatedHabit.completedDays.push(targetDate);
        }

        const savedHabit = await updatedHabit.save();
        res.status(200).json(savedHabit);
        
      } catch (error) {
        console.error("Error toggling Habit:", error);
        res.status(500).json({ message: "Internal server error" });
  }
}
