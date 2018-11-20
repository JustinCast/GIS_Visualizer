export class Layer {
  constructor(
    public host?: string,
    public port?: number,
    public dbname?: string,
    public user?: string,
    public password?: string,
    public geotabla?: string,
    public schema?: string,
    public color?: string,
    public transparencia?: number,
    public actualizarFiguras?: any,
    public figuras?: any
  ) {}
}
