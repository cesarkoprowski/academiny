export interface IRepository<Entity> {
  create(input: Partial<Entity>): Promise<Entity>;
  getById(input: number): Promise<Entity | null>;
  getAll(): Promise<Entity[]>;
  delete(input: number): Promise<boolean>;
  update(id: number, input: Partial<Entity>): Promise<Entity | null>;
}
