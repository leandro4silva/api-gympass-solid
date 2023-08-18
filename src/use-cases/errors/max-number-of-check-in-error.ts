export class MaxNumberOfCheckInError extends Error {
  constructor() {
    super('You cant not check in twice in the same day')
  }
}
