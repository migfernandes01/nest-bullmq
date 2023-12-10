import { Injectable } from '@nestjs/common';
import { MESSAGE_QUEUE } from './constants';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AppService {
  // Inject the message queue into the service
  constructor(
    @InjectQueue(MESSAGE_QUEUE) private readonly messageQueue: Queue,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  // Add a method to send a message to the queue
  async send() {
    await this.messageQueue.add({
      message: 'Message',
    });
  }
}
