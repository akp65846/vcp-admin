function getDate(dbTimestamp) {
    let date = new Date(dbTimestamp);
    return date.toLocaleDateString();
}

function getDateTimeDisplay(dbTimestamp) {
    let date = new Date(dbTimestamp);
    return date.toLocaleString();
}

export {getDate, getDateTimeDisplay};