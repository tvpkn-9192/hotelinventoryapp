import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked, OnDestroy{


  hotelName = "Hilton Hotel";
  numberOfRooms = 10;
  hideRooms = true;
  selectedRoom!: RoomList; 
  title = "Room List";

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5
  }

  roomList: RoomList[] = [];

  stream = new Observable(observer => {
    observer.next("user1");
    observer.next("user2");
    observer.next("user3");
    observer.complete();
    //observer.error("error");
  });

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  subcription!: Subscription;

  error$ = new Subject<string>(); 

  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      //console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms) => rooms.length)
  )

  constructor(private roomsService: RoomsService) { }


  ngAfterViewChecked(): void {

  }

  ngAfterViewInit(): void {
    this.headerComponent.title = "Rooms View";
    this.headerChildrenComponent.last.title = "Last Title";
  }
 
  ngDoCheck(): void {

  }

  ngOnInit(): void {
    // //console.log(this.headerComponent);
    // this.roomsService.getPhotos().subscribe((event) => {
    //   switch(event.type) {

    //   }
    // });
    this.stream.subscribe((data) => console.log(data));
    //  this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    // });
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "Rooms List";
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
        roomNumber: '301',
        roomType: "Deluxe Room",
        amenities: "Air Conditioner, Free Wi-Fi, Tv, Bathroom, Kitchem",
        price: 800,
        photos: "../shared/deluxroom.webp",
        checkinTime: new Date("28-Apr-2024"),
        checkoutTime: new Date("30-Apr-2024"),
        rating: 2.5789
    };
    //this.roomList.push(room);
    //this.roomList = [...this.roomList, room];
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: "Deluxe Room",
      amenities: "Air Conditioner, Free Wi-Fi, Tv, Bathroom, Kitchem",
      price: 800,
      photos: "../shared/deluxroom.webp",
      checkinTime: new Date("28-Apr-2024"),
      checkoutTime: new Date("30-Apr-2024"),
      rating: 2.5789
  };
  this.roomsService.editRoom(room).subscribe((data) => {
    this.roomList = data;
  });
  }

  deleteRoom() {
    this.roomsService.deleteRoom("3").subscribe((data) => {
      this.roomList = data;
    });
  }

  ngOnDestroy(): void {
    if(this.subcription) {
      this.subcription.unsubscribe();
    }
  }
}