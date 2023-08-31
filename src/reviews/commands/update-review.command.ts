export class UpdateReviewCommand {
  constructor(
    readonly userId: number,
    readonly productId: number,
    readonly reviewId: number,
    readonly content: string,
    readonly star: number,
  ) {}
}
