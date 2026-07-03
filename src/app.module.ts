import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModuleModule } from './users-module/users-module.module';
import { GiftsModule } from './gifts/gifts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', ''),
        database: configService.get<string>('DB_DATABASE', 'meucasamento'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: configService.get<string>('DB_SSL') === 'true'
          ? { rejectUnauthorized: false }
          : false,
      }),
      inject: [ConfigService],
    }),
    UsersModuleModule,
    GiftsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

