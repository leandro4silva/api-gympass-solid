import { describe, it, beforeEach, expect } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'
import { GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/In-memory-gyms-repository'

let gymsRepository: GymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Neaby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch neaby gyms', async () => {
    await gymsRepository.create({
      title: 'Nearby Gym',
      description: null,
      phone: null,
      latitude: -22.782011,
      longitude: -47.2826153,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -22.782011,
      longitude: -49.2826153,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.782011,
      userLongituge: -47.2826153,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Nearby Gym' })])
  })
})
