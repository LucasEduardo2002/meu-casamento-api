import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModuleModule } from './users-module/users-module.module';
import { GiftsModule } from './gifts/gifts.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'meucasamento',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModuleModule,
    GiftsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

