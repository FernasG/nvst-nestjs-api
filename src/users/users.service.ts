import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, FindAllUsersDto, UpdateUserDto } from './users.interface';
import { PrismaService } from 'src/database';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }

  public async create(createUserDto: CreateUserDto) {
    const { email, cpf, name, password } = createUserDto;

    const user = await this.prismaService.users.findFirst({ where: { OR: [{ email }, { cpf }] } });

    if (user) throw new BadRequestException('Email or CPF already in use.');

    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const data = { email, cpf, name, password: passwordHash };

    return this.prismaService.users.create({ data });
  }

  public async findAll(params: FindAllUsersDto) {
    const { skip, take } = params;
    return this.prismaService.users.findMany({ skip, take });
  }

  public async findOne(userId: number) {
    const user = await this.prismaService.users.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  public async update(userId: number, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.users.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found.');

    const { email, password, name } = updateUserDto;

    const data: UpdateUserDto = {};

    if (name) data.name = name;
    if (email) data.email = email;
    if (password) data.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    return this.prismaService.users.update({ where: { id: userId }, data });
  }

  public async remove(userId: number) {
    const user = await this.prismaService.users.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found.');

    return this.prismaService.users.delete({ where: { id: userId } });
  }
}
