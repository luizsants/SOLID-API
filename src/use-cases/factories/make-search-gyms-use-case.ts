import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gym-repository"
import { SearchGymUseCase } from "../search-gyms"

export function makeSearchGymsUseCase() {
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new SearchGymUseCase(gymsRepository)
    return useCase
}