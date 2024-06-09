import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) {

  }

  async signUp(createUserDto: CreateUserDto): Promise<{token: string, userId: any, email: string}>{
    const { name, email, password, isAdmin } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      isAdmin
    })

    const token = this.jwtService.sign({id: user._id})

    return {token, userId: user._id, email: user.email}

  }

  async login(loginDto: LoginDto): Promise<{token: string, userId: any, email: string}>{
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({email})

    if (!user) {
      throw new UnauthorizedException('Invalid email')
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password')
    }

    const token = this.jwtService.sign({id: user._id})

    return {token, userId: user._id, email: user.email}

  }

  create(CreateUserDto: CreateUserDto) {
    return 'This action adds a new auth';
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  findById(id: string) {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Por favor, introduzca un id correcto');
    }

    const user = this.userModel.findById(id);
    
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
    if (!existingUser) {
      throw new NotFoundException(`Usuario #${userId} no encontrado`);
    }
    return existingUser;
  }

  async remove(userId: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundException(`Usuario #${userId} no encontrado`);
    }
    return deletedUser;
  }
}
