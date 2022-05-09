import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dogodki-sidenav',
  templateUrl: './dogodki-sidenav.component.html',
  styleUrls: ['./dogodki-sidenav.component.css']
})
export class DogodkiSidenavComponent implements OnInit {

  @Input()
  selectedPage? : string;

  constructor() { }

  ngOnInit(): void {
  }

}
