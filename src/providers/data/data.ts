import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


export interface INormativeCard{
  uprN: number;
  gender: string;
  title: string;
  results: any;
}


@Injectable()
export class DataProvider {

  constructor(private http: Http){}


  getCards(): Observable<INormativeCard[]>{
      return this.http.get('assets/ServerData.json')
                .map((resp: Response) => {
                    let cardList = resp.json().normCards;
                    let cards : INormativeCard[] = [];
                    for(let index in cardList){
                      let card = cardList[index];
                      cards.push({uprN: parseInt(card[1]), gender:card[0], title:card[2], results:card[3]});
                    }
                    return cards;
                });
  }

  getTitles(): Observable<Array<string>>{

    return this.getCards().map((resp) => {
      let titles: Array<string> = [];
      for(let index in resp){
        titles.push(<string>resp[index].title);
      }
      return titles;
    });

  }


}
