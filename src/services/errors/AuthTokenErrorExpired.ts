export class AuthTokenErrorExpired extends Error {
  constructor() {
    super('Error with authentication token.')
  }
}
