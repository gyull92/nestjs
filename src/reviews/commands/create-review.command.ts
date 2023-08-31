export class CreateReviewCommand {
  constructor(
    readonly userId: number,
    readonly productId: number,
    readonly salesId: number,
    readonly content: string,
    readonly star: number,
  ) {}
}
