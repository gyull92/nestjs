export class UpdateCommentCommand {
  constructor(
    readonly userId: number,
    readonly articleId: number,
    readonly commentId: number,
    readonly content: string,
  ) {}
}
