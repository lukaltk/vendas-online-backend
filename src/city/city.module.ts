import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entity/city.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([CityEntity]),
    CacheModule.register({ ttl: 900000 * 1000 }),
  ],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
