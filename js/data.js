const constants = require("./constants.js");
const functions = require("./utils.js");

function generateOffer(index){
    return {
        id: index + 1,
        author: {
            avatar: `img/avatars/user0${functions.getRandomInt(constants.countAvatar.min, constants.countAvatar.max)}.png`
        },
        offer: {
            title: constants.titlesArray[functions.getRandomInt(0, constants.titlesArray.length - 1)],
            address: `${functions.getRandomFloat(1.1, 2.5)}, ${functions.getRandomFloat(1.1, 2.5)}`,
            price: functions.getRandomInt(constants.countPrice.min, constants.countPrice.max),
            type: constants.typesArray[functions.getRandomInt(0, constants.typesArray.length - 1)],
            rooms: functions.getRandomInt(constants.countRooms.min, constants.countRooms.max),
            guests: functions.getRandomInt(constants.countGuests.min, constants.countGuests.max),
            checkin: constants.checkinsArray[functions.getRandomInt(0, constants.checkinsArray.length - 1)],
            checkout: constants.checkoutsArray[functions.getRandomInt(0, constants.checkoutsArray.length - 1)],
            features: functions.getRandomUniqueArray(constants.featuresArray),
            description: constants.descriptionsArray[functions.getRandomInt(0, constants.descriptionsArray.length - 1)],
            photos: functions.getRandomUniqueArray(constants.photosArray),
            location: {
                x: functions.getRandomFloat(constants.locationXValues.min, constants.locationXValues.max),
                y: functions.getRandomFloat(constants.locationYValues.min, constants.locationYValues.max)
            }
        },
    }
}

module.exports = new Array(constants.countOffers).fill(null).map((e, index) => generateOffer(index));