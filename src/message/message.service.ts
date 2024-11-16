import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throwError } from 'rxjs';
import { Message, User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(senderId: string, createMessageDto: CreateMessageDto) {
    const messageEntity = await this.messageRepository.create(createMessageDto);
    const sender = await this.userRepository.findOne(senderId);

    if (!sender) {
      return throwError('Invalid sender ID');
    }

    messageEntity.user = sender;

    await this.messageRepository.insert(messageEntity);

    Logger.log('createMessage - Created message');

    return 'This action adds a new message';
  }

  findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  findOne(id: number): Promise<Message> {
    return this.messageRepository.findOne(id);
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  async remove(id: number): Promise<void> {
    await this.messageRepository.delete(id);
  }
}
