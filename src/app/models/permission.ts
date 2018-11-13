import { Column } from "./column";

export class Permission{
    constructor(
        public tableName?:String,
        public columns?: Column[],
    ){}
}