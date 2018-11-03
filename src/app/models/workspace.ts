export class WorkSpace {
    constructor(
        public xmin?: number,
        public ymin?: number,
        public xmax?: number,
        public ymax?: number,
        public width?: number,
        public height?: number,
        public factorP?: number,
        public capas?: Array<any>
    ){}
}