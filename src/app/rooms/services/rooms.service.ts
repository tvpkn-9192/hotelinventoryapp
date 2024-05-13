import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../rooms';
import { environment } from 'src/environments/environment';
import { AppConfig } from 'src/app/AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appconfig.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  roomList: RoomList[] = [];
  //headers = new HttpHeaders({'token': '123456asdflkjh'});

  getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(
    shareReplay(1)
  );

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig, private http: HttpClient ) {
    console.log(this.config.apiEndpoint);
    console.log('Rooms service is intialized');
  }

  getRooms() {
    //let abc  = this.http.get<RoomList[]>('/api/rooms');
    //console.log(this.http.get<RoomList[]>('/api/rooms'));
    
    return this.http.get<RoomList[]>('/api/rooms');
  }

  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>("/api/rooms", room);
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(id: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest("GET", `https://jsonplaceholder.typicode.com/photos`, {
      reportProgress: true
    });
    return this.http.request(request);
  }
}
