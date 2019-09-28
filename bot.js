require('tools-for-instagram');
const utils = require('./utils.js');
const config = require('./config.json');


//Start with short timeout with async
setTimeout(async() => {
    let ig = await login();

    //This interval happends 1 time per minut
    //To check intervals
    setInterval(async() => {
        let currentDate = new Date()
        let getHour = currentDate.getHours();
        let getMinutes = currentDate.getMinutes();

        //Check intervals
        config.intervals.forEach(async (time) => {

            //Check if is time to give likes
            if(getHour == time.startHour && getMinutes == time.startMinute && time.action == "likes"){
                let allPostsToGiveLike = await utils.getPostsFromHashtags(ig,config.hashtags)
                for(let i = 0 ; i < config.likesPerInterval ; i++){
                    await sleep(utils.randomIntInc(3,220))
                    likeMediaId(ig,allPostsToGiveLike[utils.randomIntInc(0,allPosts.length)].pk)
                }
            }
            
            //Check if is time to follow people
            if(getHour == time.startHour && getMinutes == time.startMinute && time.action == "followPeople"){
                let allPostsToExtractUser = await utils.getPostsFromHashtags(ig,config.hashtags)
                for(let i = 0 ; i < config.followsPerInterval ; i++){
                    await sleep(utils.randomIntInc(3,220))
                    followUser(ig, allPostsToExtractUser[utils.randomIntInc(0,allPosts.length)].user.pk)
                }
            }
        });
    }, 60000);
}, 400);
