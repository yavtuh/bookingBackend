const constants = require("./constants.js");
const functions = require("./utils.js");
const fs = require("fs");

function getNewOffer(data){
    const dataTxt = JSON.parse(fs.readFileSync("data.txt", "utf-8"));
    const ids = dataTxt.map(object => {
        return object.id;
    });
    const maxId = Math.max(...ids);
    return {
        id: maxId + 1,
        author: {
            avatar: `img/avatars/user0${functions.getRandomInt(constants.countAvatar.min, constants.countAvatar.max)}.png`
        },
        offer: {
            title: data.title,
            address: data.address,
            price: data.price,
            type: data.type,
            rooms: data.room_number,
            guests: data.capacity,
            checkin: data.timein,
            checkout: data.timeout,
            features: data.feature.split(','),
            description: data.description,
            photos: functions.getRandomUniqueArray(constants.photosArray),
            location: {
                x: data.locationX,
                y: data.locationY
            }
        },
    }
}

module.exports = {
    getNewOffer
};