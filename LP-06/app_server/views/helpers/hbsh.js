const fs = require('fs')


function ifCond(v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
}

function consoleLog(something) {
    console.log(something);
};



function ifMyMsg(idCurrUser, idMsg, options) {
    if (idCurrUser == idMsg) {
        return options.fn(this);
    }
    return options.inverse(this);
}

function formatDateAndTime(date) {
    if (!date) {
        return null;
    }

    var dateFormat = new Date(date);

    var minute = pad2(dateFormat.getMinutes());
    var hour = pad2(dateFormat.getHours() + 1);
    var month = pad2(dateFormat.getMonth() + 1);//months (0-11)
    var day = pad2(dateFormat.getDate());//day (1-31)
    var year = dateFormat.getFullYear();

    var formattedDate;

    if (isToday(dateFormat)) {
        formattedDate = day + "." + month + "." + year + " " + hour + ":" + minute;
    } else {
        formattedDate = day + "." + month + "." + year;
    }

    return formattedDate;
};

function isToday(someDate) {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
}

function formatDate(date) {
    if (!date) {
        return null;
    }

    var dateFormat = new Date(date);

    var month = pad2(dateFormat.getMonth() + 1);//months (0-11)
    var day = pad2(dateFormat.getDate());//day (1-31)
    var year = dateFormat.getFullYear();

    var formattedDate = day + "." + month + "." + year;

    return formattedDate;
};

function validRange(value, min, max, options) {
    if (!value) {
        return options.inverse(this);
    } else if (min && value < min) {
        return options.inverse(this);
    } else if (max && value > max) {
        return options.inverse(this);
    }

    return options.fn(this);
};

function valueInArray(arr, val, options) {
    if (arr.includes(val)) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
}

function getFolderContent(path) {
    var folderContent = fs.readdirSync(path)

    return folderContent;
}

function pad2(n) {
    return (n < 10 ? '0' : '') + n;
}

function jsonConvert(context) {
    return JSON.stringify(context);
};


module.exports = {
    ifCond,
    formatDate,
    jsonConvert,
    consoleLog,
    ifMyMsg,
    ifCond,
    validRange,
    valueInArray,
    getFolderContent,
    formatDateAndTime
};
