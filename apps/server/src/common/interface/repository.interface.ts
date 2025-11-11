export interface IRepository {
  create(input: any): Promise<any>;
  getById(input: any): Promise<any>;
  getAll(input: any): Promise<any>;
  delete(input: any): Promise<any>;
  update(id: number, input: any): Promise<any>;
}
