import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.2clllx6-NcqpYF0Tk9Zt9mQQivp7gHBH55zyEtz-4dA';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
      
        app = moduleFixture.createNestApplication();        
        app.use(cookieParser());
        await app.init();
    });

    afterEach(() => app.close());

    it('/repositories (GET) without AUTH_TOKEN', async () => {
        return await request(app.getHttpServer())
            .get('/repositories')
            .query({ name: 'nest' })
            .send()
            .expect(401);
    });

    it.only('/repositories (GET) with AUTH_TOKEN', async () => {
        return await request(app.getHttpServer())
            .get('/repositories')
            .query({ name: 'nest', page: 3 })
            .set('Cookie', [`AUTH_TOKEN=${AUTH_TOKEN}`])
            .send()
            .expect(200);
    });

    it('/repositories (GET) with invalid params', async() => {
        return await request(app.getHttpServer())
            .get('/repositories')
            .query({ name: 'nest', page: 'string_value' })
            .set('Cookie', [`AUTH_TOKEN=${AUTH_TOKEN}`])
            .send()
            .expect(400);
    });
});
