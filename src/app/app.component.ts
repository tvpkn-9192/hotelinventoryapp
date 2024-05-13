import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { localStorageToken } from './localstorage.token';
import { InitService } from './init.service';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';

  @ViewChild('name', { static: true }) name!: ElementRef;

  constructor(
    @Inject(localStorageToken) private localStorage: any,
    private initService: InitService
  ) {
    console.log(initService.config);
  }

  ngOnInit(): void {
    this.name.nativeElement.innerText = 'Hilton Hotel';
    this.localStorage.setItem('name', 'Hilton Hotel');
  }
  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 20;
  // }

  // //role = "Admin";

  // @ViewChild("user", {read: ViewContainerRef}) vcr!: ViewContainerRef;
}
