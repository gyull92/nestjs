export class UpdateUserCommand {
  constructor(
    readonly userId: string,
    readonly name: string,
    readonly phone: string,
    readonly address: string,
  ) {}
}
