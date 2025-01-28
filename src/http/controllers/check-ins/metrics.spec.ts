import request from 'supertest'
import { app } from '@/app';

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';

describe('Check-in metrics (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('should be able to get the count of check-in', async () => {
        const { token } = await createAndAuthenticateUser(app)
        const user = await prisma.user.findFirstOrThrow()


        const gym = await prisma.gym.create({
            data: {
                title: 'javaScript Gym',
                latitude: -20.1517169,
                longitude: -40.237347,
            }
        })


        await prisma.checkIn.createMany({
            data: [
                {
                    gym_id: gym.id,
                    user_id: user.id,
                },
                {
                    gym_id: gym.id,
                    user_id: user.id,
                }
            ]
        })
        const response = await request(app.server)
            .get('/check-ins/metrics')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(201)
        expect(response.body.checkInsCount).toEqual(2)
    });
});