import { Component } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private fileChooser: FileChooser,
  ) {}

  chooseFile(){
    this.fileChooser.open()
    .then(uri => console.log(uri))
    .catch(e => console.log(e));
  }

}
