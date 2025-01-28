import { expect, it, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate User Case', () => {

    beforeEach(() => {
         usersRepository = new InMemoryUsersRepository()
         sut = new AuthenticateUseCase(usersRepository)
    })

    it('Should be able to authenticate', async () => {

        await usersRepository.create({
            name: "Luiz Santos",
            email: "luiz@gmail.com",
            password_hash: await hash('123456', 6),
        })

        const { user } = await sut.execute({
            email: "luiz@gmail.com",
            password: '123456',
        })
        expect(user.id).toEqual(expect.any(String))
    })

    it('Should not be able to authenticate with wrong email', async () => {

        await expect(() => sut.execute({
            email: "luiz@gmail.com",
            password: '123456',
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
    it('Should not be able to authenticate with wrong password', async () => {

        await usersRepository.create({
            name: "Luiz Santos",
            email: "luiz@gmail.com",
            password_hash: await hash('123456', 6),
        })

        await expect(() => sut.execute({
            email: "luiz@gmail.com",
            password: '123123',
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })


})