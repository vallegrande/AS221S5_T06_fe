import { Component } from '@angular/core';

@Component({
  selector: 'app-computer-home',
  templateUrl: './computer-home.component.html',
  styleUrls: ['./computer-home.component.css']
})
export class ComputerHomeComponent {
  activeTab: string = 'objetivos';

  selectTab(tab: string) {
    this.activeTab = tab;
  }
}
