export class CreateUserCommand {
  constructor(
    readonly userId: string,
    readonly password: string,
    readonly name: string,
    readonly phone: string,
    readonly address: string,
  ) {}
}
