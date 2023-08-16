import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckInUseCase } from './check-in'
import { beforeEach, describe, expect, it, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInTwiceSameDay } from './errors/check-in-twice-same-day'
import { GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/In-memory-gyms-repository'

let checkInsRepository: CheckInsRepository
let gymsRepository: GymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.782011,
      userLongitude: -47.2826153,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  // red, green, refactor
  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.782011,
      userLongitude: -47.2826153,
    })

    expect(async () => {
      await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -22.782011,
        userLongitude: -47.2826153,
      })
    }).rejects.toBeInstanceOf(CheckInTwiceSameDay)
  })

  it('should not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.782011,
      userLongitude: -47.2826153,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.782011,
      userLongitude: -47.2826153,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
