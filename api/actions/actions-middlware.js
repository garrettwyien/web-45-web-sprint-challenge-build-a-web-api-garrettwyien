// add middlewares here related to actions
const Actions = require('./actions-model');

function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url}}`
    );
    console.log(req.body);
    next();
  }

async function validateActionsId(req,res,next) {
    try{
        const { id } = req.params
        const possibleActions = await Actions.get(id)
        if (possibleActions){
            req.project = possibleActions
            next();
        } else {
            next({ status:404 })
        }
    } catch (err) {
        next(err);
    }
}

function validateActionsBody(req,res,next){
    if  (
        !req.body.name ||
        typeof req.body.name !== 'string' ||
        !req.body.text ||
        typeof req.body.text !== 'string'
      ) {
        next({ status: 400 })
      } else {
        next()
      }
}

function validateActionsCompleted(req,res,next){
    if  (
        req.body.completed !== null 
      ) {
        next();
      } else {
        next({ status: 400})
      }
}

  module.exports = { logger, validateActionsBody, validateActionsCompleted, validateActionsId  }