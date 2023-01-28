type ListRequiredKey = "listName" | "data"; 

interface iListRequest {
    listName: string;
    data: iData[];
};

interface iList  extends iListRequest {
    id: number;
};

interface iData {
    name: string;
    quantity: string;
};

export {iListRequest, iList, iData, ListRequiredKey};