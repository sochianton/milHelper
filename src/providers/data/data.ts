import { Injectable, OnInit } from '@angular/core';
import { Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


export interface INormativeCard{
  uprN: number;
  gender: string;
  title: string;
  results: any;
}

export interface ITitles{
  uprN: number;
  title: string;
}


@Injectable()
export class DataProvider implements OnInit{

  constructor(private http: Http){}

  ngOnInit(){

  }

  getCards(g:string): Observable<INormativeCard[]>{
      return this.http.get('assets/ServerData.json')
                .map((resp: Response) => {
                    let cardList = resp.json().normCards;
                    let cards : INormativeCard[] = [];
                    for(let index in cardList){
                      let card = cardList[index];
                      if(card[0] != g) continue;
                      cards.push({uprN: parseFloat(card[1]), gender:card[0], title:card[2], results:card[3]});
                    }
                    return cards;
                });
  }

  getAllCards(): Observable<INormativeCard[]>{
      return this.http.get('assets/ServerData.json')
                .map((resp: Response) => {
                  
                    let cardList = resp.json().normCards;
                    let cards : INormativeCard[] = [];
                    for(let index in cardList){
                      let card = cardList[index];
                      cards.push({uprN: parseFloat(card[1]), gender:card[0], title:card[2], results:card[3]});
                    }
                    return cards;
                });
  }

  getTitles(g:string): Observable<Array<ITitles>>{

    return this.getAllCards().map((resp) => {
      let titles: Array<ITitles> = [];
      for(let i in resp){
        let card = resp[i];
        if(card.gender != g) continue;
        titles.push({uprN: card.uprN, title:card.uprN + '-' + card.title});
      }
      return titles;
    });

  }


}
