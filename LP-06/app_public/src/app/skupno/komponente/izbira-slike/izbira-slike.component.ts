import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-izbira-slike',
  templateUrl: './izbira-slike.component.html',
  styleUrls: ['./izbira-slike.component.css']
})
export class IzbiraSlikeComponent implements OnInit {


  constructor() { }

  public paths: string[] =
    ["barbell.png", "basketball.png", "beach.png", "clapperboard.png", "fitness.png",
      "football.png", "game-console.png", "hangout.png", "hiking (1).png", "hiking.png",
      "masks.png", "party.png", "picnic.png", "poker-cards.png", "rock.png", "skiing.png",
      "sports.png", "sport-shoes.png", "studying.png", "swimming.png", "timetable.png",
      "volleyball.png", "walking.png", "walking-the-dog.png"
    ];

  public changeImg(imageUri: string): void {

    let image: any = document.getElementById("eventImage");

    image.src = `assets/images/events/${imageUri}`;

    let modal: any = document.getElementById("changePictureModal");
    modal.click()
  }
  	
  ngOnInit(): void {
  }

}
