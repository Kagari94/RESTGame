
function RandomNumber(){
    const randomNum = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    return randomNum;
}

exports.RandomNumber = RandomNumber;