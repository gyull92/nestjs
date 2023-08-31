export class DeleteProductCommand {
  constructor(readonly userId: number, readonly productId: number) {}
}
