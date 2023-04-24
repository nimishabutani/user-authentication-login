import { Request, Response } from "express";
import { validationResult } from 'express-validator';
import { IGroup } from '../model/IGroup';
import mongoose from "mongoose";
import{APP_STATUS} from '../constants/constants';
import groupTable from '../database/groupSchema';
import { request } from "http";
import { error } from "console";


export const getAllGroups = async (request: Request, response: Response) => {
    try {
    let groups: IGroup[] | undefined = await
    groupTable.find();
    if (groups) {
    return response.status(200).json(groups);
    }
    } catch (error: any) {
    return response.status(500).json({
    status: APP_STATUS.FAILED,
    data: null,
    error: error.message
    });
    }
   }


export const createGroups = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
    return response.status(400).json({errors:
   errors.array()});
    }
    try {
    let {name} = request.body;
    // check if the name already exists
    let group: IGroup | null | undefined = await
   groupTable.findOne({name: name});
    if (group) {
    return response.status(400).json({
    status: APP_STATUS.FAILED,
    data: null,
    error: "Name is already Exists"
    });
    }
    let theGroup: IGroup | null | undefined = await new
    groupTable({name: name}).save();
    if (theGroup) {
    return response.status(200).json({
    status: APP_STATUS.SUCCESS,
    data: theGroup,
    msg: "Group is Created"
    });
    }
    } catch (error: any) {
    return response.status(500).json({
    status: APP_STATUS.FAILED,
    data: null,
    error: error.message
    });
    }
   }


export const getGroups = async (request: Request, response: Response) =>  {
    try {
    let {groupId} = request.params;
    const mongoGroupId = new mongoose.Types.ObjectId(groupId);
    let theGroup: IGroup | undefined | null = await
    groupTable.findById(mongoGroupId);
    if (!theGroup) {
    return response.status(404).json({
    status: APP_STATUS.FAILED,
    data: null,
    error: "No Group is found"
    });
    }
    return response.status(200).json(theGroup);
    } catch (error: any) {
    return response.status(500).json({
    status: APP_STATUS.FAILED,
    data: null,
    error: error.message
    });
    }
   }


