export class CreateArticleCommand {
  constructor(
    readonly userId: number,
    readonly title: string,
    readonly content: string,
    readonly image: string,
  ) {}
}
