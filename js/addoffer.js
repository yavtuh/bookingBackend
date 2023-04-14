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
            avatar: data.avatar
        },
        offer: {
            title: data.title,
            address: data.address,
            price: Number(data.price),
            type: data.type,
            rooms: Number(data.room_number),
            guests: Number(data.capacity),
            checkin: data.timein,
            checkout: data.timeout,
            features: data.feature.split(','),
            description: data.description,
            photos: [data.house],
            location: {
                x: Number(data.locationX),
                y: Number(data.locationY)
            }
        },
    }
}

module.exports = {
    getNewOffer
};