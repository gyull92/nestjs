export class PasswordChangeCommand {
  constructor(readonly userId: string, readonly password: string) {}
}
