export class DeleteArticleCommand {
  constructor(readonly userId: number, readonly articleId: number) {}
}
