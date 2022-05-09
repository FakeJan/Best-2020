import { Component, OnInit } from '@angular/core';
import { KlepetService } from '../../storitve/klepet.service';
import { Klepet } from '../../razredi/klepet';
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { UporabnikService } from '../../storitve/uporabnik.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-klepet',
  templateUrl: './klepet.component.html',
  styleUrls: ['./klepet.component.css']
})
export class KlepetComponent implements OnInit {

  constructor(private location: Location, private pot: ActivatedRoute, private klepetStoritev: KlepetService,
    private uporabnikService: UporabnikService) { }

  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;

  public chats: Klepet[] = [];

  public currentUserId = "";
  public eventId = "";
  public selectedChat: boolean = false;
  public izbranPogovor: Klepet = new Klepet();

  public novoSporocilo = {
    vsebina: '',
    userId: '',
  };

  searchword = "";
  subscription: Subscription = new Subscription;
  intervalId!: number;

  private pridobiKlepet(): void {
    this.klepetStoritev.pridobiKlepet(this.currentUserId)
      .subscribe((klepeti) => {
        if (!(JSON.stringify(klepeti) === JSON.stringify(this.chats))) {
          this.chats = klepeti;
          this.posodobiKlepet();
        }
      });
  }

  public getDogodekId(dogodekId: string): void {
    this.eventId = dogodekId;
    if (dogodekId)
      this.location.go(`/klepet/${dogodekId}`);
    this.getSelectedChat();
  }

  private getSelectedChat(): void {
    for (let i = 0; i < this.chats.length; i++) {
      if (this.chats[i].dogodekId._id == this.eventId) {
        this.izbranPogovor = this.chats[i];
        this.selectedChat = true;
      }
    }
  }

  public myMsg(id: any): boolean {
    if (id == this.currentUserId) {
      return true;
    }
    return false;
  }

  public addMessage(chatId: any): void {
    this.novoSporocilo.userId = this.currentUserId;
    this.klepetStoritev.dodajSporocilo(chatId, this.novoSporocilo)
      .subscribe((sporocilo) => {
        this.pridobiKlepet();
        // this.izbranPogovor.sporocila.push(sporocilo);
      }
      );
  }

  public posodobiKlepet(): void {
    if (this.eventId != "") {
      this.getDogodekId(this.eventId);
    }
  }

  public deleteMessage(chatId: any, sporociloId: any): void {
    this.klepetStoritev.zbrisiSporocilo(chatId, sporociloId)
      .subscribe(() => {
        this.pridobiKlepet();
        // this.izbranPogovor.sporocila.splice(this.izbranPogovor.sporocila.findIndex(x => x._id == sporociloId), 1);
      }
      );
  }

  ngOnInit(): void {
    this.currentUserId = this.uporabnikService.getLoggedUser()._id;
    this.pridobiKlepet();
    const source = interval(10000);
    this.subscription = source.subscribe(() => this.pridobiKlepet());

    this.pot.paramMap
      .pipe(
        switchMap((parametri: ParamMap) => {
          let idDogodka: string = (parametri.get('idDogodka') || '').toString();
          this.getDogodekId(idDogodka.toString());
          return "abc";
        })
      ).subscribe(() => {
      });
  }

  // ngOnDestroy() {
  //   this.subscription && this.subscription.unsubscribe();

  // }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  openNav() {
    var x: any = document.getElementById("main-sidebar-container");
    x.style.marginLeft = "0%";
  }

  closeNav() {
    var x: any = document.getElementById("main-sidebar-container");
    x.style.marginLeft = "-100%";
  }


}
