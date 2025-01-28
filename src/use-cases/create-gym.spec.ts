import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym User Case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)
    })

    it('Should be able to create a gym', async () => {
        const { gym } = await sut.execute({
            title: 'Js Gym',
            description: null,
            phone: null,
            latitude: -20.1517169,
            longitude: -40.237347,
        })

        expect(gym.id).toEqual(expect.any(String))
    })

})