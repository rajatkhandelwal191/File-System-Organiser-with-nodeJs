
function helpfn(){    // `` --> bectics ...it is used to print in next line too
    console.log(`List of all commands -
                     1) Tree command - node Fo.js tree <dirname>)    
                     2) Organize command - node Fo.js organize <dirname>)   
                     3) Tree command - node Fo.js help`)   
};     

module.exports={
    helpKey : helpfn
}