import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SingSync';

  constructor(private titleService: Title, private router: Router){}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}