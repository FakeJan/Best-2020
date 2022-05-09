import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ValidatorFn, AbstractControl, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Dogodek } from '../../razredi/dogodek';
import { DogodkiService } from '../../storitve/dogodki.service';
import { MapService } from '../../storitve/map.service';
import { PovezavaService } from '../../storitve/povezava.service';
import { UporabnikService } from '../../storitve/uporabnik.service';

declare const $: any;
declare const L: any;

@Component({
  selector: 'app-dogodek-podrobnosti',
  templateUrl: './dogodek-podrobnosti.component.html',
  styleUrls: ['./dogodek-podrobnosti.component.css']
})
export class DogodekPodrobnostiComponent implements OnInit {
  @NgModule({

  })

  dogodekForm: any = this.formBuilder.group({
    // spadunk: [{ disabled: true, value: '' }, [Validators.required, validDateValidator()]]
    spadunk: ['', [Validators.required, validDateValidator()]]
  });



  validated: boolean = false;
  imeDogodka: ValidationResult = new ValidationResult();
  mestoDogodka: ValidationResult = new ValidationResult();
  naslovDogodka: ValidationResult = new ValidationResult();
  opisDogodka: ValidationResult = new ValidationResult();
  oznakeDogodka: ValidationResult = new ValidationResult();
  maxStUdelezenihDogodka: ValidationResult = new ValidationResult();

  @Input() action?: string;
  @Input() dogodek: Dogodek = new Dogodek("assets/images/events/timetable.png");
  @Input() omejitveDogodka: boolean = true;

  dogodekLokacija = {
    city: this.dogodek.city,
    address: this.dogodek.address,
    coordinates: this.dogodek.coordinates
  };

  map: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dogodkiService: DogodkiService,
    private mapService: MapService,
    private uporabnikService: UporabnikService,
    private povezavaStoritev: PovezavaService
  ) { }

  ngOnInit(): void {
    var map = this.map;
    var lokacijaMesto = "";
    var lokacijaHisnaStevilka = "";
    var lokacijaNaslov = "";
    var lokacijaZip = "";
    var popup = L.popup();

    map = L.map('map').setView([46.059646, 14.505751], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(map);

    map.on('click', (e: any) => {
      this.mapService.getLocation(e.latlng.lat, e.latlng.lng)
        .subscribe((data: any) => {
          data.address.hasOwnProperty('road') ? lokacijaNaslov = data.address.road : lokacijaNaslov = data.address.village;
          if (data.address.hasOwnProperty('house_number')) lokacijaHisnaStevilka = data.address.house_number;
          if (data.address.hasOwnProperty('postcode')) lokacijaZip = data.address.postcode;
          data.address.hasOwnProperty('city') ? lokacijaMesto = data.address.city : lokacijaMesto = data.address.town;

          this.dogodek.city = `${lokacijaZip} ${lokacijaMesto}`;
          this.dogodek.address = `${lokacijaNaslov} ${lokacijaHisnaStevilka}`;
          this.dogodek.coordinates = [e.latlng.lat, e.latlng.lng];

          popup
            .setLatLng(e.latlng)
            .setContent(lokacijaNaslov + " " + lokacijaHisnaStevilka + ", " + lokacijaZip + " " + lokacijaMesto)
            .openOn(map);
        });
    })

    $('#exampleModal').on('shown.bs.modal', function () {
      map.setView([46.059646, 14.505751], 13);
      setTimeout(function () {
        map.invalidateSize(true);
      }, 10);
    });
  }

  public addDogodek(): void {
    if (!this.validateEvent()) {
      return;
    }

    this.dogodkiService.addDogodek(this.dogodek)
      .subscribe((dogodek: Dogodek) => {
        alert("Dogodek ustvarjen");
        let user = this.uporabnikService.getLoggedUser();
        user.created.push(dogodek._id);
        // this.dogodki.splice(this.dogodki.findIndex(x => x._id === eventId), 1);
        this.uporabnikService.setLoggedUser(user);
        this.router.navigate([`/ustvarjeni_dogodki`]);
      }
      )
  }

  public updateDogodek(): void {
    if (!this.validateEvent()) {
      return;
    }
    this.dogodkiService.updateDogodek(this.dogodek)
      .subscribe((dogodek: any) => {
        alert("Dogodek posodobljen");
        this.router.navigate([`/ustvarjeni_dogodki`]);
      })
  }


  private validateEvent(): boolean {
    var isValid = true;
    this.validated = true;


    if (this.isEmptyOrSpaces(this.dogodek.title)) {
      this.imeDogodka.message = "Obvezno polje";
      this.imeDogodka.valid = false;
      isValid = false;
    } else {
      this.imeDogodka.message = "";
      this.imeDogodka.valid = true;
    }


    if (this.isEmptyOrSpaces(this.dogodek.city)) {
      this.mestoDogodka.message = "Obvezno polje"
      this.mestoDogodka.valid = false;
      isValid = false;
    } else {
      this.mestoDogodka.message = "";
      this.mestoDogodka.valid = true;
    }

    if (this.isEmptyOrSpaces(this.dogodek.address)) {
      this.naslovDogodka.message = "Obvezno polje";
      this.naslovDogodka.valid = false;
      isValid = false;
    } else {
      this.naslovDogodka.message = ""
      this.naslovDogodka.valid = true;
    }


    const today = new Date();

    if (!this.dogodekForm.valid) {
      alert("neveljaven datum dogodka");
      isValid = false;
    }


    // var tags: string[] = [];
    // document.getElementsByName("tag").forEach(x => {
    //   tags.push(x.innerText.substring(0, x.innerText.length - 2));
    // });

    if (!this.validateTags(this.dogodek.tags)) {
      isValid = false;
    }

    if (this.omejitveDogodka) {
      if (this.isNumber(this.dogodek.participantMax)) {
        this.maxStUdelezenihDogodka.message = "";
        this.maxStUdelezenihDogodka.valid = true;
      } else {
        this.maxStUdelezenihDogodka.message = "Neveljaven vnos";
        this.maxStUdelezenihDogodka.valid = false;
        isValid = false;
      }
    } else {
      this.dogodek.participantMax = 0;
      this.maxStUdelezenihDogodka.message = "";
      this.maxStUdelezenihDogodka.valid = true;
    }

    if (this.dogodek.description.length > 800) {
      this.opisDogodka.message = "Največ 800 znakov";
      this.opisDogodka.valid = false;
      isValid = false;
    } else {
      this.opisDogodka.message = "";
      this.opisDogodka.valid = true;
    }

    if (!isValid) {
      return false;
    }

    let image: any = document.getElementById("eventImage");

    this.dogodek.eventImage = image.src.substring(image.src.indexOf("assets/images/events/"), image.src.length);

    // event.participantMax = event.participantMax == "" ? 0 : event.participantMax;

    return isValid;
  }

  allTags: string[] = ["Šport", "Zunaj", "Ekipni šport", "Piknik",
    "Morje", "Smučanje", "Bazen", "Kopanje", "Sneg", "Učenje", "Šola",
    "Odbojka", "Rokomet", "Nogomet", "Fizika", "Matematika", "Film", "Zabava",
    "Tek", "Hoja", "Pohod", "Hrib", "Gorjanci", "Sprehod", "BBQ",
    "Plavanje", "Poletje", "Zima", "Rojstni dan", "50-letnica", "Koncert",
    "Kino", "Serija", "Druženje", "Hrana", "Pijača", "Počitnice",
    "Nagrada", "Slovenija", "Amerika", "Tujina", "Namizni nogomet", "Tenis",
    "Namizni tenis", "Vikend", "Vikend zabava", "Družabne igre", "Jahanje", "Golf", "Pikado", "Dirka", "Gledališče", "Stand up",
    "Poletje", "Zima", "Petek", "Festival", "Kulinarika",];

  private validateTags(tags: string[]): boolean {

    const uppercased = tags.map(tag => tag.toUpperCase());
    const uppercasedAllTags = this.allTags.map((tag: string) => tag.toUpperCase());

    const noDups = new Set(uppercased);
    if (noDups.size < 3) {
      this.oznakeDogodka.message = "Vsaj 3 različne oznake";
      this.oznakeDogodka.valid = false;
      return false;
    } else if (noDups.size !== uppercased.length) {
      this.oznakeDogodka.message = "Oznake se ne smejo ponavljati";
      this.oznakeDogodka.valid = false;
      return false;
    } else if (!uppercasedAllTags.some((r: string) => uppercased.indexOf(r) >= 0)) {
      this.oznakeDogodka.message = "Vsaj 1 oznaka iz definiranega lista";
      this.oznakeDogodka.valid = false;
      return false;
    }
    this.oznakeDogodka.message = "";
    this.oznakeDogodka.valid = true;

    return true;
  }

  private isNumber(value: number) {
    var num = /^(0|[1-9][0-9]*)$/;
    return num.test("" + value)
  }

  private isEmptyOrSpaces(str: string) {
    return str === null || str.match(/^ *$/) !== null;
  }

  resetLocation() {
    this.dogodek.city = this.dogodekLokacija.city;
    this.dogodek.address = this.dogodekLokacija.address;
    this.dogodek.coordinates = this.dogodekLokacija.coordinates;
  }

  addTag(tagValue: string): void {
    this.dogodek.tags.push(tagValue);
  }

  removeTag(tagValue: string): void {
    this.dogodek.tags.splice(this.dogodek.tags.indexOf(tagValue), 1);
  }

  removeInitialTag(tag: any, tagValue: string) {
    var tagsList: any = document.getElementById("tagsList");
    this.removeTag(tagValue);
    tagsList.removeChild(tag.path[1]);
  }

  jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

}

class ValidationResult {
  message: string = "";
  valid: boolean = true;
}

export function validDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1)
    let date = new Date(control.value);

    if (control.value) {
      return yesterday <= new Date(control.value) ? null : { 'dateInPast': true };
    } else {
      return { 'invalidDate': true }
    }
    return null;
  };
}

