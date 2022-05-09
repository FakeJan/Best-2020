import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { UporabnikService } from '../../storitve/uporabnik.service';

@Component({
  selector: 'app-izbira-avatar',
  templateUrl: './izbira-avatar.component.html',
  styleUrls: ['./izbira-avatar.component.css']
})
export class IzbiraAvatarComponent implements OnInit {

  constructor(private uporabnikService: UporabnikService) { }

  public baseAvatarPath: string = "profileAvatar";
  public paths: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];

  ngOnInit(): void {

  }

  public changeImg(slika: any): void {
    let image: any = document.getElementById("accountSettingsAvatar");
    image.src = `assets/images/profileAvatars/avatarOptions/profileAvatar${slika}.png`;
    //shranjujemo kasneje.

    let modal: any = document.getElementById("changePictureModal");
    modal.click()
  }
}
