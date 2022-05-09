export class Dogodek {
  "_id": string = "";
  "title": string = "";
  "eventImage": string = "";
  "date": Date = new Date();
  "city": string = "";
  "address": string = "";
  "coordinates": number[] = [0,0];
  "tags": string[] = [];
  "participantMax": number;
  "description": string = "";
  "users": string[] = [];
  "buttons": string = "";
  "eventWeather": string = "";

  
  constructor(eventImage? : string){
    this.eventImage = "" + eventImage;
  }
}
