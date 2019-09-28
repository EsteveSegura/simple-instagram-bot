require('tools-for-instagram');
const utils = require('./utils.js');
const config = require('./config.json');

(async () => {
    let ig = await login();

    //This interval happends 1 time per minut to check intervals
    setInterval(async() => {
        let currentDate = new Date()

        console.log(currentDate.getHours())
        console.log(currentDate.getMinutes())
        let getHour = currentDate.getHours();
        let getMinutes = currentDate.getMinutes();
        

        //Check intervals
        config.intervals.forEach(async (time) => {

            //Check if is time to give likes
            if(getHour == time.startHour && getMinutes == time.startMinute && time.action == "likes"){
                let allPostsToGiveLike = await utils.getPostsFromHashtags(ig,config.hashtags)
                for(let i = 0 ; i < config.likesPerInterval ; i++){
                    await sleep(utils.randomIntInc(3,220))
                    likeMediaId(ig,allPostsToGiveLike[utils.randomIntInc(0,allPostsToGiveLike.length)].pk)
                }
            }
            
            //Check if is time to follow people
            if(getHour == time.startHour && getMinutes == time.startMinute && time.action == "followPeople"){
                let allPostsToExtractUser = await utils.getPostsFromHashtags(ig,config.hashtags)
                for(let i = 0 ; i < config.followsPerInterval ; i++){
                    await sleep(utils.randomIntInc(3,220))
                    followUser(ig, allPostsToExtractUser[utils.randomIntInc(0,allPostsToExtractUser.length)].user.pk)
                }
            }

            //Check if is time to uppload picture
            if(getHour == time.startHour && getMinutes == time.startMinute && time.action == "uploadPicture"){
                let fileToUpload = await utils.getFileToUpload('./img')
                await uploadPicture(ig, fileToUpload.caption, fileToUpload.pathOfFileToUpload)
                await utils.backupFolder('./upload')
            }

        });
    }, 60000);
})();
