import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';





@Component({
	templateUrl: 'gloryDetails.html',
})
export class GloryDetails {

	item;

	constructor(params: NavParams) {

		this.item = params.get('item');

	}
}