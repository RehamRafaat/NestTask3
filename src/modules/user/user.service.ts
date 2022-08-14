import {Injectable,UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as bycrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }
  

  async allUsers() {
    return await this.userRepository.find({
      relations: ['tasks', 'tasks.user', 'tasks.status'],
    });
  }

  async oneUser(id: number) {
    return await this.userRepository.find({
      where: { id: id },
      relations: ['tasks', 'tasks.user'],
    });
  }
  async addNewUser(username: string, password: string) {
    await this.userRepository.insert({
      username: username,
      password: password,
      tasks: [],
    });
    return 'User added successfully !! ';
  }

  async updateUser(id: number, user: { username: string; password: string }) {
    return await this.userRepository.update(id, {
      username: user.username,
      password: user.password,
    });
  }


  async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }


  
  async login(user: { username: string; password: string }) {
    const userData = await this.userRepository.findOne({
      where: { username: user.username },
    });

    if (!userData) {
      throw new UnauthorizedException('Invalid Data !! Check username and password added');
    }

    const passwordIsMatch = await bycrypt.compare(user.password,userData.password);
    if (!passwordIsMatch)
    {
      throw new UnauthorizedException('Invalid password !!');
    }

    return `hello again ${user.username}`
  }

  async signup(user: { username: string; password: string })
  {
    const hashedPassword = await bycrypt.hash(user.password, 12);
    const newUser = this.userRepository.create({
      username: user.username,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }
}
