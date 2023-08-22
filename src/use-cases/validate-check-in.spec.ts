import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { describe, it, beforeEach, expect, vi } from 'vitest'
import { ValidateCheckInUseCase } from './validate-check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { afterEach } from 'node:test'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

let checkInsRepository: CheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate inexistent check-in', async () => {
    expect(async () => {
      await sut.execute({
        checkInId: 'inexistent-check-in-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be  able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 12, 0))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOneMinutes = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutes)

    expect(async () => {
      await sut.execute({
        checkInId: createdCheckIn.id,
      })
    }).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
