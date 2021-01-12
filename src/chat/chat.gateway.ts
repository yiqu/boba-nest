/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, 
  OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WsResponse } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { ChatPayload } from './chat.model';

@WebSocketGateway({ 
  path: '/websockets', // important to include the slash prefix
  namespace: "/chat"
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  private readonly logger = new Logger(ChatGateway.name); 

  @WebSocketServer() 
  server: Server;
  
  users = 0;
  messagesToClient: ChatPayload[] = [];

  afterInit(server: Server) {
    this.logger.log("chat gateway started!" + server)
  }

  handleConnection(client: Socket){
    this.logger.log("A chat connection success!: " + client.id)
    this.users++;
    this.server.emit('users', this.users);
    this.server.emit("messageToClientz", this.messagesToClient);
  }

  handleDisconnect(client: Socket){
    this.logger.log("A chat disconnect success: " + client.id)
    this.users--;
    this.server.emit('users', this.users);
  }

  /**
   * In the decrorator, the string is the event name, messageToServer
   * When a client connects, sends a payload to the messageToServer event, this will 
   * take it and emit a event of messageToClient with the same payload
   */
  @SubscribeMessage('messageToServer')
  onHandleMessageToServer(client: Socket, payload: ChatPayload) {
    this.logger.log("a message receeived ")
    this.messagesToClient.push(payload);
    // this is for just a single client
    // return {
    //   event: "messageToClientz",
    //   data: this.messagesToClient
    // }
    this.server.emit("messageToClientz", this.messagesToClient); // this is the same as below when return a WsResponse
  }

  @SubscribeMessage('messageToServer2')
  onHanleMessagesToEveryone(client: Socket, payload: ChatPayload): void {
    this.server.emit("messageToClient", payload);
  }

}