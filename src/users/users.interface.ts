export class CreateUserDto {
  cpf: string;
  name: string;
  email: string;
  password: string;
}

export class FindAllUsersDto {
  skip?: number;
  take?: number;
}

export class UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
}