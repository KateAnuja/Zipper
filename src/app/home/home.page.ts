import { Component } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import {Plugins} from '@capacitor/core';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import * as JSZip from 'jszip';
import { Zip } from '@ionic-native/zip/ngx';
import { File } from '@ionic-native/file/ngx';



const {IonicPlugin} = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  filesArray = [];
  zipfilePath = "";
  destinationPath = "";
  constructor(
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private base64: Base64,
    private zip: Zip,
    private file : File,
  ) {}

  chooseFile(){
    this.fileChooser.open()
    .then((uri) => {
     console.log("uri",uri)
     this.filePath.resolveNativePath(uri)
     .then((path)=>{
        this.zipfilePath=path;
        console.log(this.zipfilePath);
        this.destinationPath=this.zipfilePath.substring(0,this.zipfilePath.lastIndexOf("/"));
        console.log(this.destinationPath);
     }).catch(e => console.error(e));
    }).catch(e => console.error(e));
  }

  

  unZipFile(){
    this.zip.unzip(
      this.zipfilePath, 
      this.file.externalCacheDirectory,
      (progress) => 
      console.log('Unzipping, ' + Math.round((progress.loaded / progress.total) * 100) + '%'))
      .then((result) => {
        if(result === 0) console.log('SUCCESS');
        if(result === -1) console.log('FAILED');
      });
  }

}
