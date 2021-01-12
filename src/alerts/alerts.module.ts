/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AlertGateway } from './alerts.gateway';

@Module({
  providers: [
    AlertGateway
  ]
})
export class AlertModule {}