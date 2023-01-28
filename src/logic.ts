import { Request, Response } from "express";
import { listData } from "./database";
import { iList, iListRequest, ListRequiredKey } from "./interfaces";

const validateData = (payload: any): iList => {
  const payloadKeys: string[] = Object.keys(payload);

  const requiredKeys: ListRequiredKey[] = ["listName", "data"];
  const hasRequiredKeys: boolean = requiredKeys.every((key: string) => payloadKeys.includes(key));
  const lengthPayload = payloadKeys.length === 2

  if (!hasRequiredKeys || !lengthPayload) {
    const joinedkeys: string = requiredKeys.join(", ");
    throw new Error (`Required keys are: ${joinedkeys}.`)
  };
  
  return payload;
};

const createList = (request: Request, response: Response): Response => {
  
  try {
    const validatedData: iListRequest = validateData(request.body);

    const addId = listData.length + 1;

    const arryId = listData.map(elemente => elemente.id );
    const validateId: boolean = arryId.includes(addId);

    if(validateId){

      const lengthArray = arryId.length;
      const lastId = lengthArray - 1;
      const valueLastId = arryId[lastId] + 1;

      let updatedValidation: iList = { ...validatedData, id: valueLastId};

      listData.push(updatedValidation);

      return response.status(201).json(updatedValidation);
    };

    let updatedValidation: iList = { ...validatedData, id: addId};

    listData.push(updatedValidation);
    
    return response.status(201).json(updatedValidation);

  } catch (error: unknown) {

    if (error instanceof Error) {
      return response.status(400).json({ message: error.message });
    };

    console.error(error);
    return response.status(500).json({ message: error });
  }
};

const readList = (request: Request, response: Response): Response => {
  return response.status(200).json(listData);
};

const retrieveList = (request: Request, response: Response): Response => {

  const indexList: number = request.list.indexList;

  return response.status(200).json(listData[indexList]);
};

const updateList = (request: Request, response: Response): Response => {
  const indexList: number = request.list.indexList;
  
try {
  const id: number = Number(request.params.id);
  const name: string = request.params.name;
  
  const findList = listData.find(element => element.id === id);
  const data = findList?.data;
  const indexItem: number | undefined = data?.findIndex(element => element.name === name);

  const itemList = data?.find((element) => element.name === name);
 
  const update = {...itemList, ...request.body};

  if( indexItem === -1){
    return response.status(404).json({message: `Item with name ${name} does not exist`});
  };
 
  data?.splice(indexItem? indexItem: 0, 1, update);

  
  return response.status(200).json(request.body);
  
} catch (error) {
  return response.status(500).json({ message: error });
}
};

const deleteList = (request: Request, response: Response): Response => {
  const indexList: number = request.list.indexList;

  listData.splice(indexList, 1);

  return response.status(204).send();
};

const deleteItemList = (request: Request, response: Response): Response => {
  
  const id: number = Number(request.params.id);
  const name: string = (request.params.name);

  const findList = listData.find(element => element.id === id);
  const data = findList?.data;
  const indexItem: number | undefined = data?.findIndex(element => element.name === name);

  if( indexItem === -1){
    return response.status(400).json({message: `${name} not found`});
  };

  data?.splice(indexItem? indexItem: 0, 1);


  return response.status(204).json();
};



export {
  createList,
  readList,
  retrieveList,
  deleteList,
  deleteItemList,
  updateList,
};
