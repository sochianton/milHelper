import { Component } from '@angular/core';

import { FizoPage } from '../fizo/fizo';
import { GloryPage } from '../glory/glory';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  tab1Root = FizoPage;
  tab2Root = GloryPage;

  constructor() {

  }
}
