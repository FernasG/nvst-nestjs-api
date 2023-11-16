import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './auth.interface';
import { Public } from './auth.decorators';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  public async login(@Body() { email, password }: SignInDto) {
    return this.authService.signIn(email, password);
  }
}
