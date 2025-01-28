import request from 'supertest'
import { app } from '@/app';

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Nearby Gym (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('should be able to list nearby gyms', async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "JavaScript Gym",
                description: "Some description",
                phone: '1199999999',
                latitude: -20.1517169,
                longitude: -40.237347,
            })
        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "TypeScript Gym",
                description: "Some description",
                phone: '1199999999',
                latitude: -20.6736395,
                longitude: -40.5015134,
            })

        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({
                latitude: -20.1517169,
                longitude: -40.237347,
            })
            .set('Authorization', `Bearer ${token}`)
            .send()
        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'JavaScript Gym',
            })
        ])
    });
});