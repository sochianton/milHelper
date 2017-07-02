import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { INormativeCard, DataProvider, ITitles} from  '../../../providers/data/data';



@Component({
  selector: 'normativ',
  templateUrl: 'normativ.html'
})
export class NormativComponent implements OnInit{

  //cards: INormativeCard[];

  @Output() onBalChange: EventEmitter<number> = new EventEmitter<number>();

  result: number;
  resInBal: number = 0;
  uprNum: number;
  @Input() vozrast:number = 0;
  @Input() ves:number = 0;
  titles;

  constructor(private data: DataProvider) {}

  ngOnInit(){
    this.titles = this.data.getTitles();
  }

  resCalculate(){

    if(typeof this.result === "undefined" || this.result == 0) {
      console.log('Переменная result не определена или равно 0');
      this.resInBal=0;
      return;
    }
    if(typeof this.uprNum === "undefined"){
      console.log('Переменная uprNum не определена');
      this.resInBal=0;
      return;
    }

    console.log('Проверка прошла');

    let cards: INormativeCard[] = [];
    let card : INormativeCard;
    this.data.getCards().subscribe(res=>{
      for(let i in res){
        cards.push(res[i])
      }

      for (let i in cards){
        let curCard = cards[i];
        if(curCard.uprN == this.uprNum){
          card = curCard;
          break;
        }
      }

      if(typeof card === "undefined"){
        console.log('Переменная card не определена');
        return;
      }

      // Таблица
      let tabl = card.results;
      if(typeof tabl['mod'] !== "undefined"){
        let tmpTabl: any;
        let mod = 'vozrast';
        for (let k in tabl){
          if(k == 'mod'){
            mod = tabl[k];
            continue;
          }
          if(typeof tmpTabl === "undefined") tmpTabl = tabl[k];
          if(mod == 'vozrast'){
            if(this.vozrast >= parseInt(k)){
              tmpTabl = tabl[k];
            }
          }
          if(mod == 'ves'){
            if(this.ves >= parseInt(k)){
              tmpTabl = tabl[k];
            }
          }

        }
        tabl = tmpTabl;
      }

      let mod:number = 1;
      let first: number;
      for (let ind in tabl){
        let val = tabl[ind];
        if(typeof first === "undefined"){
          first = val;
          continue;
        }
        else{
          if(first > val) mod = -1;
          break;
        }
      }

      console.log(tabl);

      let tmplRes: number = 0;

      for(let key in tabl){
        let val = tabl[key]; //15
        if(this.result >= val && mod == 1){
          tmplRes = parseInt(key);
          continue;
        }
        if(this.result <= val && mod == -1){
          tmplRes = parseInt(key);
          continue;
        }

        break;

      }

      this.resInBal = tmplRes;
      this.onBalChange.emit(this.resInBal);

    });

  }


}
