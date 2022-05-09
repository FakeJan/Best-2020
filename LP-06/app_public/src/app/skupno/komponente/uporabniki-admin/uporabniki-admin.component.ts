import { Component, OnInit } from '@angular/core';
import { Uporabnik } from '../../razredi/uporabnik';
import { UporabnikService } from '../../storitve/uporabnik.service';

@Component({
  selector: 'app-uporabniki-admin',
  templateUrl: './uporabniki-admin.component.html',
  styleUrls: ['./uporabniki-admin.component.css']
})
export class UporabnikiAdminComponent implements OnInit {

  uporabniki?: Uporabnik[];
  searchword = "";

  constructor(private uporabnikiService: UporabnikService) { }

  ngOnInit(): void {
    this.getUporabniki();
  }

  private getUporabniki(): void {
    this.uporabnikiService.getUsers().subscribe((uporabniki: Uporabnik[]) => (this.uporabniki = uporabniki))
  }

  deleteUser(userId : string){
    this.uporabnikiService.deleteUser(userId)
    .subscribe(() => (this.getUporabniki()))
  }

}
