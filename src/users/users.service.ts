import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

type findOneParams = {
  email?: string;
  nickname?: string;
};

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hash,
    });
    return createdUser.save();
  }

  async findOne({ email, nickname }: findOneParams): Promise<User | undefined> {
    if (email !== undefined) return this.userModel.findOne({ email });
    else if (nickname !== undefined)
      return this.userModel.findOne({ nickname }).select('-password');
    else return undefined;
  }
}
