// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const { logger, validateActionsBody, validateActionsCompleted, validateActionsId  } = require('./actions-middlware');
const router = express.Router();

router.get('/', logger, async (req,res,next)=>{
    Actions.get()
    .then(projects =>{
        res.status(200).json(projects);
    })
    .catch(next);
});

router.get('/:id', logger, validateActionsId, (req,res)=>{
    res.json(req.project);
});

//I am struggling with my Post and Put requests. In postman, I manually inputted a test object as JSON into the body of my post request, which showed up in the logger as a valid object with the appropriate key value pairs, but it does not actually post, and it keeps yielding [object Object]. I compared my code to all my different module and guided projects this week and was unable to figure out why it is not working. If the grader sees where the error is, I would greatly appreciate their input. Thanks!

router.post('/', logger, validateActionsBody, (req, res, next) => {
    Actions.insert(req.body)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(err => {
        next(err)
      });
  });

  router.put('/:id', logger, validateActionsId, validateActionsBody,validateActionsCompleted, (req,res,next)=>{
    Actions.update(req.params.id, req.body)
    .then(project=>{
        res.status(200).json(project)
    })
    .catch(err=>{
        next(err)
    })
});

router.delete('/:id', logger, validateActionsId, (req,res,next)=>{
    Actions.remove(req.params.id)
    .then((req)=>{
        res.status(200).json(req.params)
    })
    .catch(err=>{
        next(err);
    })
});

module.exports = router;