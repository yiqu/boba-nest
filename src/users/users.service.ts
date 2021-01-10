/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { from, Observable, of } from "rxjs";
import { User, UserEntity } from "./user.model";

@Injectable()
export class UserSerivce {
  readonly currentUsers: UserEntity[] = [
    new UserEntity({
      firstName: "Kevin",
      lastName: "Qu",
      password: "mypass",
      id: "sdfj33j"
    })
  ];

  addUser(user: User) {
    this.currentUsers.push(new UserEntity({
      ...user
    }));
  }

  getAllUsers(): Observable<UserEntity[]> {
    return of(this.currentUsers);
  }

  getUsersCount() {
    return this.currentUsers.length;
  }

  getTitle(): string {
    return "Users Service!";
  }

  getUserByIndex(index: number) {
    if (index < this.currentUsers.length) {
      return this.currentUsers[index];
    }
    return undefined;
  }
}
