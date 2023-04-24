import express, { Router, Request, Response, response } from 'express';
import { body, validationResult } from 'express-validator';
import { request } from 'http';
import * as groupController from '../controllers/groupController';
const groupRouter: Router = Router();



/**
@usage : to get all groups
@method : GET
@params : no-params
@url : http://localhost:9000/groups
 */
groupRouter.get("/", async(request: Request, response: Response) => {
    await groupController.getAllGroups(request,response);
    
});



/**
@usage : create group
@method : POST
@params : name
@url : http://localhost:9000/groups
 */
groupRouter.post("/",[
    body('name').not().isEmpty().withMessage('name is required')
], async(request: Request, response: Response) => {
    await groupController.createGroups(request,response);
    
});




/**
@usage : to get a group
@method : GET
@params : no-params
@url : http://localhost:9000/groups/:groupId
 */
groupRouter.get("/:groupId", async(request: Request, response: Response) => {
    await groupController.getGroups(request,response);
    
});


export default groupRouter;