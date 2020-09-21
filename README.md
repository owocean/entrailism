# entrailism
[Intralism](https://store.steampowered.com/app/513510/Intralism/) auto-mapper (kinda?)

# installing and setup

### prerequisites
In order to use this tool, you must have
- [Node.js](https://nodejs.org/) v12.16.3 (It might work on older/newer versions)
- [NPM](https://www.npmjs.com/get-npm) 6.14.8 (It should have downloaded with nodejs)
- Intralism
*How else are you gonna use the maps without Intralism?*

### install
Mac/Linux open Terminal  
Windows open Powershell/CMD  
Run the following commands:
```sh
git clone https://github.com/owocean/entrailism.git
cd entrailism
npm install
```
Make sure NPM installed everything correctly before continuing  
You will also need [SoX](https://sourceforge.net/projects/sox/files/sox/) to convert wav to ogg  
The program wont know where SoX is located, so create a file named `sox.txt` and in the file, enter the path of the .exe
```txt
C:\Program Files (x86)\sox-14-4-2\sox.exe
```
Something like that

### usage
Place your .wav file in the same directory as the source.  
On windows, you can run `gen.bat` and on Linux/Mac you can run
```sh
node index --music <filename>.wav --name MyMap --bpm 120
```
`--difficulty` is optional. `easy`, `hard`, or `harder`  
`--random` is optional. `true` or `false`  
Your map will output in the `output` folder  
**NOTICE** The script uses `audiowaveform.exe` which is a *Windows* executable.  
If you wish to use this on Linux/Mac, follow the build steps [here](https://github.com/bbc/audiowaveform)