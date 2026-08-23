import Habit from "../models/Habit.js"

//createHabit, getAllHabits, deleteHabit, editHabit, toggleHabit

export async function createHabit(req, res) {
    try {
    const {name, icon, color} = req.body;
    const habit = new Habit({ name, icon, color });

    const savedHabit = await habit.save();
    res.status(201).json({savedHabit});
  }
  catch (error) {
    console.error("Error creating Habit:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllHabits(req, res) {
    try{
    
        const habits = await Habit.find().sort({createdAt:-1});
        res.status(200).json(habits);
    
    } catch (error) {
        
        console.error("Error fetching habits:", error);
        res.status(500).json({ message: "Internal server error" });
    
    }
}

export async function deleteHabit(req, res) {
     try {

    const deletedHabit = await Habit.findByIdAndDelete(req.params.id);

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
        const updatedHabit = await Habit.findByIdAndUpdate(
        req.params.id,
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
    
  }
  catch (error) {
    
  }
}
