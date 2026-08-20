import express from "express";

const router = express.Router();

/*Routes:
1. creating a habit "POST /api/habits"
2. getting all habits "GET /api/habits"
3. deleteing a habit "DELETE /api/habits/:id"
4. editing a habit "PUT /api/habits/:id"
5. toggling a habit as done (today) "POST /api/habits/:id/toggle"
6. toggling a habit as done (anyday) "POST /api/habits/:id/toggle/:day"
*/

//creating new habit
router.post("/", createHabit);

//getting all habits
router.get("/", getAllHabits);

//deleting a habit
router.delete("/:id", deleteHabit);

//editing a habit 
router.put("/:id", editHabit);

router.post("/:id/toggle", toggleHabit);

router.post("/:id/toggle/:day", toggleHabit);

