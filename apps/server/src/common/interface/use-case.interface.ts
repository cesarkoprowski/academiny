export interface IUseCase<INPUT, OUTPUT> {
  execute(input: INPUT): Promise<OUTPUT>;
}
