export class AuthTokenErrorInvalid extends Error {
  constructor() {
    super('Error with authentication token.')
  }
}
