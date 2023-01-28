import * as express from "express";
import { List, Data } from "../../interfaces";

declare global {
    namespace Express {
        interface Request {
            list: {
                indexList: number;
            }
           
        }
    }
};