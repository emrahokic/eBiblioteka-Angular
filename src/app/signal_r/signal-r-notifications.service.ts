import { Injectable } from '@angular/core';
// import * as signalR from '@aspnet/signalr';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Notifikacija} from '../shared/models/notifikacija';
import {NotiService} from '../dashboard/notifications/notifications.component';
@Injectable({
  providedIn: 'root'
})
export class SignalRNotificationsService {


  private hubConnection: HubConnection;
  constructor(private notiService: NotiService) {
  }
  public startConnection = (Token: string) => {

        this.hubConnection = new HubConnectionBuilder()
          .withUrl('https://ebibliotekawebapi2-prod.us-west-2.elasticbeanstalk.com/notifications', { accessTokenFactory: () => Token})
          .build();

        console.log(this.hubConnection);
        this.hubConnection
          .start()
          .then(() => console.log('started'))
          .catch((err) => console.log(err));
  }

  public addOnNotificationListener = () => {
    this.hubConnection.on('SendNotification', (data: Notifikacija) => {
      this.notiService.emitter.next();
      this.notiService.item.next(data);
    });
  }
}
