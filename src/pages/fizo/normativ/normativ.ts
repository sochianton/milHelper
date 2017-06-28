import { Component, Input, OnInit } from '@angular/core';
import { INormativeCard, DataProvider} from  '../../../providers/data/data';



@Component({
  selector: 'normativ',
  templateUrl: 'normativ.html'
})
export class NormativComponent implements OnInit{

  //cards: INormativeCard[];

  result: number = 12.5;
  titles;

  constructor(private data: DataProvider) {
    
  }

  ngOnInit(){
    this.titles = this.data.getTitles();
  }


}
