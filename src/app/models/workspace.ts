export class WorkSpace {
    public capas: Array<any> = [];
    constructor(
        public id?: number,
        public xmin?: number,
        public ymin?: number,
        public xmax?: number,
        public ymax?: number,
        public width?: number,
        public height?: number,
        public factorP?: number
    ){}
}