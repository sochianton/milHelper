import { Component } from '@angular/core';

import { FizoPage } from '../fizo/fizo';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  tab1Root = FizoPage;

  constructor() {

  }
}
