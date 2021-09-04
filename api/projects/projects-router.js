// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const { logger, validateProjectId, validateProjectName, validateProjectDescription  } = require('./projects-middleware');

const router = express.Router();

router.get('/', logger, async (req,res,next)=>{
    Projects.get()
    .then(projects =>{
        res.status(200).json(projects);
    })
    .catch(next);
});

router.get('/:id', logger, validateProjectId, (req,res)=>{
    res.json(req.project);
});

router.post('/', logger, validateProjectName, validateProjectDescription, (req,res,next)=>{
    const newProject = req.body;
    Projects.insert(newProject)
    .then(project=>{
        res.status(201).json(project);
    })
    .catch(err=>{
        next(err)
    })
});

// router.put(=>{

// });

// router.delete(=>{

// });

// router.get(=>{

// });

module.exports = router;