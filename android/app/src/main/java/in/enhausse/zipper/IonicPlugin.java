package in.enhausse.zipper;

import android.util.Log;

import com.getcapacitor.JSArray;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

@NativePlugin()
public class IonicPlugin extends Plugin {

  @PluginMethod()
  public void generateZip(PluginCall call){

    try{
      JSArray files = call.getArray("files");
      String[] filesArray=new String[files.length()];
      for(int i=0;i<files.length();i++){
        String filename = files.getString(i);
        Log.e("filename", filename);
        filesArray[i]=filename;
      }
      new Compress(filesArray,"zip").zip();
    }catch(Exception e){

    }


  }
}
