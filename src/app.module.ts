import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { MESSAGE_QUEUE } from './constants';
import { MessageConsumer } from './message.consumer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Add ConfigModule to load environment variables
    ConfigModule.forRoot(),
    // Add BullModule with async configuration (to load environment variables)
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    // Register BullMQ queue
    BullModule.registerQueue({
      name: MESSAGE_QUEUE,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MessageConsumer],
})
export class AppModule {}
