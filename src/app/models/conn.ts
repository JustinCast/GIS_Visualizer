export class Conn {
  constructor(
    public host?: string,
    public port?: number,
    public dbname?: string,
    public user?: string,
    public password?: string,
    public geoTable?: string,
    public schema?: string,
    public color?: string,
    public opacity?: number,
    public actualizarFiguras?: any
  ) {}
}
