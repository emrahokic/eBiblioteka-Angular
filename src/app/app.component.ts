import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {SignalRNotificationsService} from './signal_r/signal-r-notifications.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private  auth: AuthService, private signalR: SignalRNotificationsService) {
  }

  ngOnInit(): void {
    this.auth.autoLogin();
    this.auth.user.subscribe(res => {
      this.signalR.startConnection(res.Token);
      this.signalR.addOnNotificationListener();
    });
  }
}
