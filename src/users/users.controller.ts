/* eslint-disable prettier/prettier */
import { Body, ClassSerializerInterceptor, Controller, Get, 
  HttpException, 
  HttpStatus, 
  Logger, Param, Post, Req, UseInterceptors } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { User, UserEntity } from './user.model';
import { UserSerivce } from './users.service';


@Controller('users')
export class UsersController {

  private readonly logger = new Logger(UsersController.name); 

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private us: UserSerivce) {
  }

  /**
   * Using class xform to exclude certain properties.
   * It is the same as using : const realUsers = plainToClass(User, users);
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Get("all")
  getAllUsers(): Observable<UserEntity[]> {
    return this.us.getAllUsers();
  }

  @Get("all2")
  getAllUsersWithAllProperties() {
    return this.us.getAllUsers();
  }

  @Get("all/count")
  addUserCount(): number {
    return this.us.getUsersCount();
  }

  @Get(":index")
  getUserByIndex(@Param() params) {
    this.logger.log(params)
    
    const enetity = this.us.getUserByIndex(params.index);
    if (enetity) {
      return this.us.getUserByIndex(params.index);
    } else {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Index out of bound',
      }, HttpStatus.FORBIDDEN);
    }
  }


  @Get(":index/:field")
  getUserByIndexAndId(@Param() params) {
    this.logger.log(params)
  }

  @Get("title")
  getTitle(): string {
    return this.us.getTitle();
  }

  @Post("add")
  create(@Body() u: User): User {
    this.us.addUser(u);
    return u;
  }




  // @Get(["all2"])
  // getAllUsers2(@Req() request: Request): User[] {
  //   this.logger.log("request: ")
  //   this.logger.log(this.us.getAllUsers());
  //   this.logger.log(request);
  //  // return this.us.getAllUsers();
  // }
  

}