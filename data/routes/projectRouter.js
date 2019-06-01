const express = require('express');
const router = express.Router();


// database
const projectDb = require("../../data/helpers/projectModel");
const actionsDb = require("../../data/helpers/actionModel.js");

//endpoints

/***  /api/projects ***/

router.get("/", async (req, res) => {
    try {
      const projectList = await projectDb.get();
      res.json(projectList);
    } catch (err) {
      res.status(500).json({ message: `The projects list cannot be retrieved` });
    }
  });

/****  /api/projects/:id ***/

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const project = await projectDb.get(id);

      if (!project) {
        res.status(404).json({ message: "The Project was not found" });
      } else {
        res.json(project);
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was an error trying to find the project." });
    }
  });

/***  /api/projects ***/

router.post("/",  async (req, res) => {
    const project = req.body;

    try {
      const result = await projectDb.insert(project);
      res.status(201).json({ message: `Project has been created!` });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was an error saving project to the database" });
    }
  });

/****  /api/projects/:id ***/

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const project = await projectDb.get(id);
      if (!project) {
        res.status(404).json({ message: "Project was not found" });
      } else {
        await projectDb.remove(project.id);
        res.json(project);
      }
    } catch (err) {
      res.status(500).json({
        message: "There was an error trying to delete the project from the database."
      });
    }
  });

/****  /api/projects/:id ***/

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedProject = req.body;
    try {
      const project = await projectDb.get(id);
      if (!project) {
        res.status(404).json({ message: "Project was not found" });
      } else {
        await projectDb.update(id, updatedProject);
        res.json({ message: `Project has been updated` });
      }
    } catch (err) {
      res.status(500).json({
        message: "The project information cannot be modified."
      });
    }
  });

  router.get('/:projectId/actions', async (req, res) => {
    const { projectId } = req.params;

    try {
        const project = await projectDb.get(projectId);
        if(!project) {
            res.status(404).json({message: "The project with the provided id could not be found"});
        } else {
            const actionsList = await actionsDb.get();
            res.json(actionsList);
        }
    }
    catch (err) {
        res.status(500).json({message: "There was an erorr trying to retreive the actions list for the provided project"})
    }
}); 

module.exports = router;