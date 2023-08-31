export class DeleteCommentCommand {
  constructor(
    readonly userId: number,
    readonly articleId: number,
    readonly commentId: number,
  ) {}
}
