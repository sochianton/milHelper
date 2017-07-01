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

  getCards2(): Observable<INormativeCard[]>{
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

  getTitles(): Observable<Array<ITitles>>{

    return this.getCards2().map((resp) => {
      let titles: Array<ITitles> = [];
      for(let i in resp){
        titles.push({uprN: resp[i].uprN, title:resp[i].uprN + '-' + resp[i].title});
      }
      return titles;
    });

  }


}
