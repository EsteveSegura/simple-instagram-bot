require('tools-for-instagram');

//Variables to handle intervals
const likesPerInterval = 15;
const followsPerInterval = 15;

//hashtags on which we are going to act
const hashtags =[
    "vegan",
    "vegetarian",
    "govegan",
    "veganfood",
    "organic",
]

//We create schedules in which our bot will have activity
const intervals = { schedulesOfTheDay: [
    {startHour: 08, startMinute: 00, action: "likes"},
    {startHour: 10, startMinute: 00, action: "likes"},
    {startHour: 13, startMinute: 00, action: "likes"},
    {startHour: 16, startMinute: 00, action: "likes"},
    {startHour: 20, startMinute: 00, action: "likes"},
    {startHour: 23, startMinute: 00, action: "likes"},
    {startHour: 17, startMinute: 00, action: "followPeople"}
]}

//We create a function to get all the hashtags we want
async function getPostsFromHashtags(ig,arrayOfHashtags){
    //Create an empty array to store all hashtags
    let allPosts = []
    //We go through the entire list of hashtags and add it to our empty array
    for(let i = 0 ; i < arrayOfHashtags.length ; i++){
        let hashtagActual = await recentHashtagList(ig,arrayOfHashtags[i])
        allPosts.push(hashtagActual)
    }
    //This line of code aligns all the elements in the same array
    return [].concat.apply([], allPosts)
}

//This function generates a random number between a minimum and a maximum
//including the extremes within the returned range
function randomIntInc(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Set timeout for using async
setTimeout(async() => {
    let ig = await login();
    //We start our interval
    setInterval(async() => {
        //Every time our interval is executed we get the hour and minute
        let currentDate = new Date()
        let getHour = currentDate.getHours();
        let getMinutes = currentDate.getMinutes();
        /* 
            We check the list of our schedules and compare
            it with the current time, if our schedule and
            the current time is the same we execute the action
        */
        intervals.schedulesOfTheDay.forEach(async (time) => {
            if(getHour == time.startHour && getMinutes == time.startMinute && time.action == "likes"){
                //Get all post from hashtags
                let allPosts = await getPostsFromHashtags(ig,hashtags)
                /*
                    We go through the entire array to find photos
                    randomly and also like with an irregular interval
                    between 3 seconds and 220 seconds
                */
                for(let i = 0 ; i < likesPerInterval ; i++){
                    await sleep(randomIntInc(3,220))
                    likeMediaId(ig,allPosts[randomIntInc(0,allPosts.length)].pk)
                }
            }
            if(getHour == time.startHour && getMinutes == time.startMinute && time.action == "followPeople"){
                //Get all users from hashtags
                let allPosts = await getPostsFromHashtags(ig,hashtags)
                /*
                    We go through the entire array to users
                    randomly and also follow with an irregular interval
                    between 3 seconds and 220 seconds
                */
                for(let i = 0 ; i < followsPerInterval ; i++){
                    await sleep(randomIntInc(3,220))
                    followUser(ig,allPosts[randomIntInc(0,allPosts.length)].user.pk)
                }
            }
        });
    //This is the parameter of our interval, which is at 60000ms ( 1 minute )
    }, 60000);
//This is the parameter of our timeout, which is at 400ms
}, 400);
