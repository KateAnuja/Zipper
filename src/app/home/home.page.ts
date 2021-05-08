import { Component } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import {Plugins} from '@capacitor/core';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import * as JSZip from 'jszip';

const {IonicPlugin} = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  filesArray = [];
  constructor(
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private base64: Base64,
  ) {}

  chooseFile(){
    this.fileChooser.open()
    .then((uri) => {
      this.filePath.resolveNativePath(uri)
      .then((filePath) =>{
        console.log(filePath.replace(/^file:\/\//,''));
        this.base64.encodeFile(filePath).then((base64File: string) => {
        console.log("base64File",base64File);
         this.filesArray.push(base64File);
        }, (err) => {
        console.log(err);
        });
      }).catch(err => console.log(err));
    }).catch(e => console.log(e));
  }

  zipFile(){
    var zip = new JSZip();
    for(let i=0;i<this.filesArray.length;i++){
      zip.file(i+"",this.filesArray[i],{base64:true});
    }
    zip.generateAsync({type: "blob"})
    .then((content)=>{
      console.log(content);
    })
  }

}
