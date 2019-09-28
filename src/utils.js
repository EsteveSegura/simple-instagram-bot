async function getPostsFromHashtags(ig,arrayOfHashtags){
    let allPosts = []
    for(let i = 0 ; i < arrayOfHashtags.length ; i++){
        let hashtagActual = await recentHashtagList(ig,arrayOfHashtags[i])
        allPosts.push(hashtagActual)
    }
    return [].concat.apply([], allPosts)
}


function randomIntInc(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {randomIntInc , getPostsFromHashtags}