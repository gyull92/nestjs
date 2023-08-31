export class PostProductCommand {
  constructor(
    readonly userId: number,
    readonly name: string,
    readonly content: string,
    readonly price: number,
  ) {}
}
