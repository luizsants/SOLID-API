import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymUseCase(gymsRepository)

    })

    it('Should be able to search for gyms', async () => {
        await gymsRepository.create({
            title: 'JS gym',
            description: null,
            phone: null,
            latitude: -20.1517169,
            longitude: -40.237347,
        })
        await gymsRepository.create({
            title: 'TS gym',
            description: null,
            phone: null,
            latitude: -20.1517101,
            longitude: -40.237300,
        })

        const { gyms } = await sut.execute({
            query: 'JS',
            page: 1,

        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JS gym' }),
        ])
    })

    it('Should be able to fetch paginated gyms search', async () => {

        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `JS gym ${i}`,
                description: null,
                phone: null,
                latitude: -20.1517169,
                longitude: -40.237347,
            })
        }

        const { gyms } = await sut.execute({
            query: 'JS',
            page: 2,

        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JS gym 21' }),
            expect.objectContaining({ title: 'JS gym 22' })
        ])
    })

})