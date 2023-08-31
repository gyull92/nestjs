export class UpdateProductCommand {
  constructor(
    readonly userId: number,
    readonly productId: number,
    readonly name: string,
    readonly content: string,
    readonly price: number,
  ) {}
}
