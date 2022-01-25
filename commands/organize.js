const fs = require('fs');
const path = require('path');


let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx",
      "doc",
      "pdf",
      "xlsx",
      "xls",
      "odt",
      "ods",
      "odp",
      "odg",
      "odf",
      "txt",
      "ps",
      "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
  };
  

  function organizeFn(dirpath){

    let destPath;  //make destPath variable

    if(dirpath == undefined){  //if dirpath mentioned is invalid
        console.log("Please enter a valid input")
    }
    else {
        let doesExist = fs.existsSync(dirpath); //this will tell whether the dirpath exists or not

        
        // console.log(doesExist);


        if (doesExist == true){
            destPath = path.join(dirpath, "organized_files");  //to create "organized_files folder"

            // D:\WEB Developement\Node\File System Organiser with nodeJs\test foldert --> i want to create a folder in this path

            if(fs.existsSync(destPath) == false){  //agar organized files name se folder nhi hai to
                    fs.mkdirSync(destPath);
            } else{
                console.log("This folder already exists");  //only create a folder if it doesnt exist

            }

        }else{
            console.log("please enter a valid input");
        }
    }

    organizeHelper(dirpath, destPath) ;  //calling a function to organise / categorize files

}


//we are writing a function to categorize files

function organizeHelper(source , dest){
    let childNames = fs.readdirSync(source);  //get all the files inside your source/dirpath
    // console.log(childNames);

    for(let i = 0; i<childNames.length; i++){ //iterate in childNames array to get our files
        let childAddress = path.join(source, childNames[i])  //path is identified  for the files

        let isFile = fs.lstatSync(childAddress).isFile() ;  //we check whether the iterate array element  is file or not
        // console.log (childAddress + " " + isFile);

        if(isFile == true){
            let fileCategory = getCategory(childNames[i]);
            console.log(childNames[i] + "belongs to " + fileCategory)  // files belongs to their folder like media, document etc

            sendFiles(childAddress, dest, fileCategory);  //send files from childadress i.e folder adres
         }
    }

}


function getCategory(name){
    let extensionName = path.extname(name);  //will print extension name of the files present in childNames-->> .txt , .mp4 , .pdf
    // console.log(extensionName);
    
   extensionName = extensionName.slice(1); //extension name ko first index se print kardo //will remove "." dot from extension = .txt --> txt
    // console.log(extensionName)


    for(let type in types){ //for key in types

        let categoryTypeArr = types[type];  //category  //type--> txt, pdf , doc, etc
        // console.log(categoryTypeArr);
        
        for (let i = 0; i<categoryTypeArr.length; i++){
            if (extensionName == categoryTypeArr[i])
            // we matched the extension  with values present in categoryttpeArr

            return type
        }

    } 

    return 'others'  //if extenName not matched
}


function sendFiles(srcFilePath , dest, fileCategory){   //fileCategory means media , docs etc
    let catPath = path.join(dest, fileCategory)  //category Path means --> media, docs etc
    // console.log(catPath);

    if (fs.existsSync(catPath) == false){ //if category folder Path DOESNT EXIST
        fs.mkdirSync(catPath)
    }

    let fileName = path.basename(srcFilePath);  //we took out names of the files
    let destFilePath = path.join(catPath, fileName);  //here we created a path for the files in the category folder

    fs.copyFileSync(srcFilePath, destFilePath); //file copied from src to destination

    fs.unlinkSync(srcFilePath);  //delete copied files in the srcfile path

    console.log(fileName + " is copied to " + fileCategory)
}


module.exports={
    organizeKey : organizeFn
};
