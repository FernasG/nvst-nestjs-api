import { JwtModuleOptions } from '@nestjs/jwt';

export interface ConfigurationOptions {
  jwt_options: JwtModuleOptions;
  database_connection_url: string;
}