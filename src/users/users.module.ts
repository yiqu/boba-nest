/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserSerivce } from "./users.service";

@Module({
  controllers: [
    UsersController
  ],
  providers: [
    UserSerivce
  ],
})
export class UsersModule {}
