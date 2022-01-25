const fs = require('fs');
const path = require('path');



function treeFn(dirpath){

    if(dirpath == undefined){
        console.log("Please enter a valid command")
    }

    else {
        let doesExist = fs.existsSync(dirpath);
        if(doesExist == true){
            treeHelper(dirpath , " ")  //for tree like view
        }
    }
}

function treeHelper(targetPath , indent){  //indent is a type of space we give like " " for viewing 
    let isFile = fs.lstatSync(targetPath).isFile()  //here we have checked whether the targetpath isfile or folder
    
    if(isFile == true){
        let fileName = path.basename(targetPath)
        console.log(indent + "├──" + fileName)  //this will display the files
    }
    else{
        let dirName = path.basename(targetPath);
        console.log(indent + "└──" + dirName)  //this will display the folder


        let children = fs.readdirSync(targetPath)
        // console.log(children)

        // here we took out all the children of test folder  --> like docs, media etc
        
        
        for(let i = 0; i<children.length; i++){
            let childPath = path.join(targetPath, children[i])

            //console.log(childPath)

            treeHelper(childPath, indent + "\t");  //using recursion to repeat the process for all files and folders
        }

    }
}

module.exports={
    treeKey : treeFn
};
