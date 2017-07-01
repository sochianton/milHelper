import { Component, Input, OnInit } from '@angular/core';
import { INormativeCard, DataProvider, ITitles} from  '../../../providers/data/data';



@Component({
  selector: 'normativ',
  templateUrl: 'normativ.html'
})
export class NormativComponent implements OnInit{

  //cards: INormativeCard[];

  result: number;
  resInBal: number = 0;
  uprNum: number;
  titles;

  constructor(private data: DataProvider) {

  }

  ngOnInit(){
    this.titles = this.data.getTitles();
    // this.titles = [];
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

      console.log(cards);

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

      console.log(card);

      let tabl = card.results;
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

    });

  }


}
