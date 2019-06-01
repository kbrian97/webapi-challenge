const express = require('express');
const router = express.Router();

// database
const actionsDb = require("../../data/helpers/actionModel.js");


//endpoints

/***  /api/actions ***/

router.get('/', async (req, res) => {
    try {
        const actions = await actionsDb.get();
        res.json(actions)
    }
    catch (err) {
        res.status(500).json({ message: `The actions list cannot be retrieved` });
    }
});

/***  /api/actions/:actionId ***/

router.get("/:actionId", async (req, res) => {
    const { actionId } = req.params;
    try {
      const action = await actionsDb.get(actionId);

      if (!action) {
        res.status(404).json({ message: "The Action was not found" });
      } else {
        res.json(action);
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was an error trying to find the action." });
    }
  });

/****  /api/actions/ ***/  

router.post("/", async (req, res) => {
    const action = req.body;
    try {
        const created = await actionsDb.insert(action);
        res.status(200).json({message: "New Action was succesfuly created"});
    }
    catch (err){
        res.status(500).json({message: "There was an error trying to create a new action"});
    }
});

/****  /api/actions/:id ***/

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedAction = req.body;
    try {
      const action = await actionsDb.get(id);
      if (!action) {
        res.status(404).json({ message: "Action was not found" });
      } else {
        await actionsDb.update(id, updatedAction);
        res.json({ message: `Action has been updated` });
      }
    } catch (err) {
      res.status(500).json({
        message: "The action information cannot be modified."
      });
    }
  });

/****  /api/actions/:id ***/

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const action = await actionsDb.get(id);
      if (!action) {
        res.status(404).json({ message: "Action was not found" });
      } else {
        await actionsDb.remove(action.id);
        res.json(action);
      }
    } catch (err) {
      res.status(500).json({
        message: "There was an error trying to delete the action from the database."
      });
    }
  });  

module.exports = router;