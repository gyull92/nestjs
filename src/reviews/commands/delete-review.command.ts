export class DeleteReviewCommand {
  constructor(
    readonly userId: number,
    readonly productId: number,
    readonly reviewId: number,
  ) {}
}
