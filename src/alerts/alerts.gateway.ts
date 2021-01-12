/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, 
  OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WsResponse } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';

@WebSocketGateway({ 
  path: '/websockets', // important to include the slash prefix
  namespace: "/alert"
})
export class AlertGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  private readonly logger = new Logger(AlertGateway.name); 

  @WebSocketServer() 
  server: Server;

  latestAlert: string = "No alert";

  afterInit(server: Server) {
    this.logger.log("alert gateway started!" + server)
  }

  handleConnection(client: Socket){
    this.logger.log("A alert connection success: " + client.id);
    this.server.emit("alertToClient", this.latestAlert);
  }

  handleDisconnect(client: Socket){
    this.logger.log("A alert disconnect: " + client.id);
  }

  /**
   * In the decrorator, the string is the event name, messageToServer
   * When a client connects, sends a payload to the messageToServer event, this will 
   * take it and emit a event of messageToClient with the same payload
   */
  @SubscribeMessage('alertToServer')
  onSentAlert(client: Socket, payload: string) {
    this.logger.log("a alert receeived ");
    this.latestAlert = payload;
    this.server.emit("alertToClient", payload);
  }


}