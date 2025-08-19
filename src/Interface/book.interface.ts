import { Types } from "mongoose";

export interface IBook{
title:string,
author:string,
genre:string,
isbn:string,
description?:string,
copies:number,
available:boolean,
userId:Types.ObjectId

}