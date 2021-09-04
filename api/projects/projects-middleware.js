// add middlewares here related to projects
const Projects = require('./projects-model');

function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url}}`
    );
    console.log(req.body);
    next();
  }

async function validateProjectId(req,res,next) {
    try{
        const { id } = req.params
        const possibleProject = await Projects.get(id)
        if (possibleProject){
            req.project = possibleProject
            next();
        } else {
            next({ status:404 })
        }
    } catch (err) {
        next(err);
    }
}

function validateProjectBody(req,res,next){
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

function validateProjectCompleted(req,res,next){
    if  (
        req.body.completed !== null 
      ) {
        next();
      } else {
        next({ status: 400})
      }
}

  module.exports = { logger, validateProjectId, validateProjectBody, validateProjectCompleted  }