import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@instaclonecluster0.iprie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    ),
    UsersModule,
    CatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
