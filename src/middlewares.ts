import { NextFunction, Request, Response } from "express";
import { listData } from "./database";

const ensureListExists = (request: Request, response: Response, next: NextFunction): Response | void => {
    const id: number = Number(request.params.id);

    const indexList = listData.findIndex(elemento => elemento.id === id);

    if(indexList === -1){
        return response.status(404).json({
            message: `List with id ${id} does not exist`
        });
    };

    request.list = {
        indexList: indexList
    };

    return next();
} 

export {ensureListExists};