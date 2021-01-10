/* eslint-disable prettier/prettier */
import { Exclude, Expose } from 'class-transformer';

export interface User {
  firstName: string;
  lastName: string;
  id: string;
  password: string;
}

export class UserEntity {
  id: string;
  firstName: string;
  lastName: string;

  @Exclude()
  password: string;

  @Expose()
  get fullNameExposed(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}