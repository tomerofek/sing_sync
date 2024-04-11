import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

  constructor(activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
  }

  goToRoom(room_id: string): void {
    //console.log(room_id)
    if(room_id){
      this.router.navigateByUrl('/room/' + room_id);
    }
  }

  goToStats(): void{
    
  }

}
