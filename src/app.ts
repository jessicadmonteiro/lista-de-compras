import express, { Application } from "express";
import { createList, deleteList, readList, retrieveList, updateList, deleteItemList} from "./logic";
import { ensureListExists } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/purchaseList", createList );
app.get("/purchaseList", readList);
app.get("/purchaseList/:id", ensureListExists, retrieveList);
app.patch("/purchaseList/:id/:name", ensureListExists, updateList);
app.delete("/purchaseList/:id", ensureListExists, deleteList);
app.delete("/purchaseList/:id/:name", ensureListExists,deleteItemList);


const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;

app.listen(PORT, () => console.log(runningMsg));