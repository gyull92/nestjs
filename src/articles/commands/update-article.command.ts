export class UpdateArticleCommand {
  constructor(
    readonly userId: number,
    readonly articleId: number,
    readonly title: string,
    readonly content: string,
    readonly image: string,
  ) {}
}
