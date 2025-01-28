import { Gym } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms-repository"

interface FetchNeabyGymsUseCaseRequest {
    userLatitude: number
    userLongitude: number
}

interface FetchNeabyGymsUseCaseReponse {
    gyms: Gym[]
}

export class FetchNeabyGymsUseCase {
    constructor(private gymsRepository: GymsRepository) { }

    async execute({
        userLatitude, userLongitude
    }: FetchNeabyGymsUseCaseRequest): Promise<FetchNeabyGymsUseCaseReponse> {

        const gyms = await this.gymsRepository.findManyNearby(
            {
                latitude: userLatitude, longitude: userLongitude
            }
        )

        return {
            gyms,
        }
    }
}
