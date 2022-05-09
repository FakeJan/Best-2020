import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Klepet } from '../../razredi/klepet';
import { KlepetService } from '../../storitve/klepet.service';
import { UporabnikService } from '../../storitve/uporabnik.service';

@Component({
  selector: 'app-izbran-klepet',
  templateUrl: './izbran-klepet.component.html',
  styleUrls: ['./izbran-klepet.component.css']
})
export class IzbranKlepetComponent implements OnInit, AfterViewChecked {

  @Input() izbranPogovor: Klepet = new Klepet();

  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;

  novoSporocilo: any = {
    vsebina: '',
    userId: '',
  };

  currentUserId?: string;

  constructor(private klepetStoritev: KlepetService,
    private uporabnikService: UporabnikService) { }

  ngOnInit(): void {
    this.currentUserId = this.uporabnikService.getLoggedUser()._id;
    this.scrollToBottom();
  }

  public addMessage(chatId: any): void {
    this.novoSporocilo.userId = this.currentUserId;
    this.klepetStoritev.dodajSporocilo(chatId, this.novoSporocilo)
      .subscribe((sporocilo) => {
        // this.pridobiKlepet();
        this.izbranPogovor.sporocila.push(sporocilo);
      }
      );
  }

  public deleteMessage(chatId: any, sporociloId: any): void {
    this.klepetStoritev.zbrisiSporocilo(chatId, sporociloId)
      .subscribe(() => {
        // this.pridobiKlepet();
        this.izbranPogovor.sporocila.splice(this.izbranPogovor.sporocila.findIndex(x => x._id == sporociloId), 1);
      }
      );
  }

  public myMsg(id: any): boolean {
    if (id == this.currentUserId) {
      return true;
    }
    return false;
  }


  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
