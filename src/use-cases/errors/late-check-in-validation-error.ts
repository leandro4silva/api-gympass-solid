export class LateCheckInValidationError extends Error {
  constructor() {
    super(
      'The check-in can only be validated until twenty one minutes of its creation',
    )
  }
}
