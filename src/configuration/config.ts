import { ConfigurationOptions } from './config.interface';

export default ((): ConfigurationOptions => ({
  database_connection_url: process.env.DATABASE_CONNECTION_URL,
  jwt_options: {
    global: true, secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '8h' }
  }
}));