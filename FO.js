// How to take input in JS  // semicolon can ber used anywhere
const helpModule = require('./commands/help');

const organizeModule = require('./commands/organize');

const treeModule = require('./commands/tree');
const { dir } = require('console');
const fs = require('fs');
const path = require('path');

let inputArray = process.argv.slice(2);  //slice use krne se 2nd array se print hoga 
//will make whole array of [node fo.js tree folderpath] --> [tree, folderpath]
//js me input array ke form m jata h --> process.argv
// console.log(input)

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
  

let command = inputArray[0];  //now in inputArray ..slice is used to store array from 2nd index --> [tree folderpath]
                            //[0] is used becaz now "tree" is at zero index

//switch case
switch(command){
    case "tree" :    //write function here
        // console.log("Tree Implemented");
        treeModule.treeKey(inputArray[1])
        break;
    
    case "organize" :
        // console.log("Organize implemented");

        // calling a function
        // organizeFn(inputArray[1]);   //organise is at index 1  because slice is used
        organizeModule.organizeKey(inputArray[1])  //importing module
        break;

    case "help" :
        // console.log("Help implemented");
        // helpfn()
        helpModule.helpKey();n //by using modularity
        break;
    
    //default case -->>> whenever we pass invalid input
    default:
        console.log("PLEASE ENTER A VALID VALUE");
        break;
    
}


// function helpfn(){    // `` --> bectics ...it is used to print in next line too
//     console.log(`List of all commands -
//                      1) Tree command - node Fo.js tree <dirname>)    
//                      2) Organize command - node Fo.js organize <dirname>)   
//                      3) Tree command - node Fo.js help`)   
// };     


// function organizeFn(dirpath){

//     let destPath;  //make destPath variable

//     if(dirpath == undefined){  //if dirpath mentioned is invalid
//         console.log("Please enter a valid input")
//     }
//     else {
//         let doesExist = fs.existsSync(dirpath); //this will tell whether the dirpath exists or not

        
//         // console.log(doesExist);


//         if (doesExist == true){
//             destPath = path.join(dirpath, "organized_files");  //to create "organized_files folder"

//             // D:\WEB Developement\Node\File System Organiser with nodeJs\test foldert --> i want to create a folder in this path

//             if(fs.existsSync(destPath) == false){  //agar organized files name se folder nhi hai to
//                     fs.mkdirSync(destPath);
//             } else{
//                 console.log("This folder already exists");  //only create a folder if it doesnt exist

//             }

//         }else{
//             console.log("please enter a valid input");
//         }
//     }

//     organizeHelper(dirpath, destPath) ;  //calling a function to organise / categorize files

// }


// //we are writing a function to categorize files

// function organizeHelper(source , dest){
//     let childNames = fs.readdirSync(source);  //get all the files inside your source/dirpath
//     // console.log(childNames);

//     for(let i = 0; i<childNames.length; i++){ //iterate in childNames array to get our files
//         let childAddress = path.join(source, childNames[i])  //path is identified  for the files

//         let isFile = fs.lstatSync(childAddress).isFile() ;  //we check whether the iterate array element  is file or not
//         // console.log (childAddress + " " + isFile);

//         if(isFile == true){
//             let fileCategory = getCategory(childNames[i]);
//             console.log(childNames[i] + "belongs to " + fileCategory)  // files belongs to their folder like media, document etc

//             sendFiles(childAddress, dest, fileCategory);  //send files from childadress i.e folder adres
//          }
//     }

// }


// function getCategory(name){
//     let extensionName = path.extname(name);  //will print extension name of the files present in childNames-->> .txt , .mp4 , .pdf
//     // console.log(extensionName);
    
//    extensionName = extensionName.slice(1); //extension name ko first index se print kardo //will remove "." dot from extension = .txt --> txt
//     // console.log(extensionName)


//     for(let type in types){ //for key in types

//         let categoryTypeArr = types[type];  //category  //type--> txt, pdf , doc, etc
//         // console.log(categoryTypeArr);
        
//         for (let i = 0; i<categoryTypeArr.length; i++){
//             if (extensionName == categoryTypeArr[i])
//             // we matched the extension  with values present in categoryttpeArr

//             return type
//         }

//     } 

//     return 'others'  //if extenName not matched
// }


// function sendFiles(srcFilePath , dest, fileCategory){   //fileCategory means media , docs etc
//     let catPath = path.join(dest, fileCategory)  //category Path means --> media, docs etc
//     // console.log(catPath);

//     if (fs.existsSync(catPath) == false){ //if category folder Path DOESNT EXIST
//         fs.mkdirSync(catPath)
//     }

//     let fileName = path.basename(srcFilePath);  //we took out names of the files
//     let destFilePath = path.join(catPath, fileName);  //here we created a path for the files in the category folder

//     fs.copyFileSync(srcFilePath, destFilePath); //file copied from src to destination

//     fs.unlinkSync(srcFilePath);  //delete copied files in the srcfile path

//     console.log(fileName + " is copied to " + fileCategory)
// }



// function treeFn(dirpath){

//     if(dirpath == undefined){
//         console.log("Please enter a valid command")
//     }

//     else {
//         let doesExist = fs.existsSync(dirpath);
//         if(doesExist == true){
//             treeHelper(dirpath , " ")  //for tree like view
//         }
//     }
// }

// function treeHelper(targetPath , indent){  //indent is a type of space we give like " " for viewing 
//     let isFile = fs.lstatSync(targetPath).isFile()  //here we have checked whether the targetpath isfile or folder
    
//     if(isFile == true){
//         let fileName = path.basename(targetPath)
//         console.log(indent + "├──" + fileName)  //this will display the files
//     }
//     else{
//         let dirName = path.basename(targetPath);
//         console.log(indent + "└──" + dirName)  //this will display the folder


//         let children = fs.readdirSync(targetPath)
//         // console.log(children)

//         // here we took out all the children of test folder  --> like docs, media etc
        
        
//         for(let i = 0; i<children.length; i++){
//             let childPath = path.join(targetPath, children[i])

//             //console.log(childPath)

//             treeHelper(childPath, indent + "\t")  //using recursion to repeat the process for all files and folders
//         }

//     }
// }
