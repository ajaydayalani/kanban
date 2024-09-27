export interface TODO{
    id:number;
    todo:string;
    isDone:boolean;
    tags:string[]
    dueDate:Date
}

export interface board{
    board:string,
    tasks:TODO[]
  }