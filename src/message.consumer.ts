import { Process, Processor } from '@nestjs/bull';
import { MESSAGE_QUEUE } from './constants';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

// Add a processor to consume messages from the queue
@Processor(MESSAGE_QUEUE)
export class MessageConsumer {
  private readonly logger = new Logger(MessageConsumer.name);

  // Add a method to consume messages from the queue
  @Process()
  async consume(message: Job<unknown>) {
    this.logger.log(`Consuming message ${message.id}`);
    this.logger.log(`Message received: ${JSON.stringify(message)}`);
    // Simulate a long running process
    await new Promise<void>((resolve) => setTimeout(resolve, 5000));
    this.logger.log(`Message ${message.id} processed`);
  }
}
