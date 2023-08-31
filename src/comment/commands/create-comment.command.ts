export class CreateCommentCommand {
  constructor(
    readonly userId: number,
    readonly articleId: number,
    readonly content: string,
  ) {}
}
