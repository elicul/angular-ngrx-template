import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PhotoModule } from './photo/photo.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    PhotoModule,
  ],
})
export class AppModule {}