import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { maxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error.'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase
describe('Get User Profile User Case', () => {

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)

        await gymsRepository.create({
            id: 'gym-01',
            title: "JS Gym",
            description: '',
            phone: '',
            latitude: -20.1517169,
            longitude: -40.237347,
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('Should be able to check in', async () => {


        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -20.1517169,
            userLongitude: -40.237347,
        })
        expect(checkIn.id).toEqual(expect.any(String))
    })


    it('Should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -20.1517169,
            userLongitude: -40.237347,
        })

        await expect(sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -20.1517169,
            userLongitude: -40.237347,
        })).rejects.toBeInstanceOf(maxNumberOfCheckInsError)
    })
    it('Should be able to check in twice but in differenct days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -20.1517169,
            userLongitude: -40.237347,
        })
        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -20.1517169,
            userLongitude: -40.237347,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('Should not be able to check in on distant gym', async () => {
        gymsRepository.items.push({
            id: 'gym-02',
            title: "Python Gym",
            description: '',
            phone: '',
            latitude: new Decimal(-20.0543667),
            longitude: new Decimal(-40.1977284),
        }) 


        await expect(() =>
            sut.execute({
                gymId: 'gym-02',
                userId: 'user-01',
                userLatitude: -20.1517169,
                userLongitude: -40.237347,
            })
        ).rejects.toBeInstanceOf(MaxDistanceError)
    })


})