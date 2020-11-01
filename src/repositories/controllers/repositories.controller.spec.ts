import { CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationSchema } from '../../common/config/config.schema';
import configuration from '../../common/config/configuration';
import { AuthModule } from '../../common/auth/auth.module';
import { RepositoriesService } from '../services/repositories.service';
import { RepositoriesController } from './repositories.controller';

const searchReq = {
    name: 'test_repo',
    page: 1,
    per_page: 30,
    order: 'desc',
    sort: 'srats'
};

const searchRes = {
    items: [],
    total: 0
};

class RepositoriesServiceMock {
    async search(obj) {
        return searchRes;
    }
};

describe('Repositories Controller', () => {
    let controller: RepositoriesController;
    let repositoriesServiceMock: RepositoriesService;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports:[
                CacheModule.register(),
                AuthModule,
                ConfigModule.forRoot({
                    isGlobal: true,
                    load: [configuration],
                    validationSchema: ConfigurationSchema
                }),
            ],
            controllers: [RepositoriesController],
            providers: [{
                provide: RepositoriesService,
                useClass: RepositoriesServiceMock
            }],
        }).compile();

        controller = module.get<RepositoriesController>(RepositoriesController);
        repositoriesServiceMock = module.get<RepositoriesService>(RepositoriesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('search', () => {
        it('should search repo by name', async () => {
            jest.spyOn(repositoriesServiceMock, 'search');

            expect(await controller.searchRepository(searchReq)).toEqual(searchRes);
            expect(repositoriesServiceMock.search).toBeCalled();
        });
    })
});
