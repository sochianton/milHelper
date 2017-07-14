import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import {Observable} from 'rxjs/Observable';
import { GloryDetails } from './gloryDetails';
import { DataProvider, IGloryDay } from  '../../providers/data/data';





@IonicPage()
@Component({
	selector: 'page-glory',
	templateUrl: 'glory.html',
})
export class GloryPage implements OnInit {

	title: string = 'Дни воин. славы';
	items: Observable<Array<IGloryDay>> = null;

	constructor(public navCtrl: NavController, private data: DataProvider) {}

	/**
	*	Делаем настройки компонента во время инициализации
	*/
	ngOnInit(){

		this.items = this.data.getGloryDays();

	}

	openDetails(item) {
		this.navCtrl.push(GloryDetails, { item: item });
	}


}


