import { expect, it, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile User Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('Should be able to get user profiale', async () => {

        const createdUser = await usersRepository.create({
            name: "Luiz Santos",
            email: "luiz@gmail.com",
            password_hash: await hash('123456', 6),
        })

        const { user } = await sut.execute({
            userId: createdUser.id,
        })
        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual("Luiz Santos")
    })

    it('Should not be able to get user profile with wrong id', async () => {

        await expect(() => sut.execute({
            userId: 'non-existing-id',
        })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })


})