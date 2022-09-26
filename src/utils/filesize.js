function getMb(size) {
    return (size/1000/1000).toFixed(2);
}

function getMbDisplay(size) {
    return getMb(size) + ' MB';
}

export {getMb, getMbDisplay};