import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const userEntity = this.userRepository.create(createUserDto);

    await this.userRepository.insert(userEntity);

    Logger.log('createUser - Created user');

    delete userEntity.password;
    return userEntity;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: any): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async update(id: any, updateUserDto: UpdateUserDto) {
    const user: User = await this.userRepository.findOne(id);
    if (!user) {
      throw new Error('user not found');
    }
    // user.firstName = updateUserDto.firstName;
    // user.lastName = updateUserDto.lastName;
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
