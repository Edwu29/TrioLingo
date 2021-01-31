var firebase = require('firebase');

//firebase
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DB_URL,
    projectId: process.env.PROJ_ID,
    storageBucket: process.env.STR_BUCKET,
    messagingSenderId: process.env.MSG_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};
firebase.initializeApp(firebaseConfig);

function initializeData() { //this function would initialize the data under users/ and have a unique ID and empty object[].
    var data = firebase.database().ref("users/");
    var emptydata = data.push();
    emptydata.set({
        username: "",
        objects: []
    });
    var key = emptydata.key; //this is the unique key that is initialized
    console.log(key)
    return key;
}

function appendObject(id, objects) {
    var userRef = firebase.database().ref('users/' + id + "/objects")
    var newdata = userRef.push();
    newdata.set(objects);
}

module.exports = { initializeData, appendObject };