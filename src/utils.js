const fs = require('fs')
const config = require('./config.json');



//get posts from array of hashtags
async function getPostsFromHashtags(ig,arrayOfHashtags){
    let allPosts = []
    for(let i = 0 ; i < arrayOfHashtags.length ; i++){
        let hashtagActual = await recentHashtagList(ig,arrayOfHashtags[i])
        allPosts.push(hashtagActual)
    }
    return [].concat.apply([], allPosts)
}

//get random number
function randomIntInc(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//check files in folder, get 1 file, move to "./upload"
function getFileToUpload(path){
    return new Promise((resolve, reject) => {
        fs.readdir(path, function(err, items) {
            if(items.length != 0){
                let pathOfFileToUpload = `./img/${items[0]}`;
                fs.rename(`./img/${items[0]}`, `./upload/${items[0]}`, (err) => {
                    if(err){
                        reject(err)
                    }else{
                        caption = config.files.filter((fileItem) => {
                            if(fileItem.filePath == pathOfFileToUpload)
                                return fileItem.caption
                        })
                        resolve({
                            pathOfFileToUpload:pathOfFileToUpload,
                            caption: caption
                        })
                    }
                });
            }else{
                reject("Not files found")
            }
        });
    });
}

function backupFolder(path){
    return new Promise((resolve, reject) => {
        fs.readdir(path, function(err, items) {
            if(items.length != 0){
                fs.rename(`./upload/${items[0]}`, `./backup/${items[0]}`, (err) => {
                    if(err){
                        reject(err)
                    }else{
                        resolve("file moved to backup")
                    }
                });
            }else{
                reject("Not files found")
            }
        });
    });
}





module.exports = {randomIntInc , getPostsFromHashtags, getFileToUpload, backupFolder}