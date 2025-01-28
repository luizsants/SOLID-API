import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNeabyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNeabyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNeabyGymsUseCase(gymsRepository)

    })

    it('Should be able to fetch nearby gyms', async () => {
        await gymsRepository.create({
            title: 'Near Gym',
            description: null,
            phone: null,
            latitude: -20.1517169,
            longitude: -40.237347,
        })
        await gymsRepository.create({
            title: 'Far Gym',
            description: null,
            phone: null,
            latitude: -20.6736395,
            longitude: -40.5015134,
        })


        const { gyms } = await sut.execute({
            userLatitude: -20.1517169,
            userLongitude: -40.237347,

        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Near Gym' }),
        ])
    })

})