let fs = require('fs');
let bcrypt = require('bcrypt');
let Parser = require('rss-parser');

function displayTime(callback) {
    let date = new Date();
    let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    console.log(time);
    callback();
}

function testDisplayTime() {
    displayTime(() => {
        console.log('done')
    });
}

function readFile(fileName) {
    fs.readFile(fileName, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log(JSON.stringify(data.toString('utf-8')));
        }
    });
}

function testReadFile() {
    readFile('./testfile.txt');
    console.log('test');
}

function simplePromise(nb) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (nb % 2 === 0) {
                resolve('Even')
            } else {
                reject(`Error: odd nb = ${nb}`);
            }
        })
    })
    return promise;
}

function testSimplePromise() {
    let promise = simplePromise(9)
        .then(() => {
            console.log('all good');
        })
        .catch((err) => console.error(err));
}

async function testSimplePromiseAsync() {
    try {
        let promise = await simplePromise(4);
        console.log('all good');
    } catch (err) {
        console.error(err);
    }
}

function testSimplePromiseCeption() {
    let promise = simplePromise(4)
        .then(() => {
            console.log(`all good with ${4}, proceeding...`);
            return simplePromise(6)
        })
        .then(() => {
            console.log(`all good with ${6}, proceeding...`);
            return simplePromise(9)
        })
        .then(() => {
            console.log(`all good with ${9}, proceeding...`);
            return simplePromise(10)
        })
        .catch((err) => {
            console.error(err);
        })
}

function testSimplePromiseList() {
    let promiseList = [
        simplePromise(4),
        simplePromise(6),
        simplePromise(8),
        simplePromise(9)
    ];

    let validation = Promise.all(promiseList)
        .then(() => {
            console.log('everything good');
        })
        .catch((err) => {
            console.error(err);
        });
}

function convertCallbackToPromise() {
    let string = "thisIsATestString";

    let promise = new Promise((resolve, reject) => {
        let hash = bcrypt.hash(string, 10, (err, encrypted) => {
            if (err) {
                reject(error);
            } else {
                resolve(encrypted);
            }
        });
    });
    return promise;
}

function testConvertCallbackToPromise() {
    let promise = convertCallbackToPromise()
        .then((val) => {
            console.log(val);
        })
        .catch((err) => {
            console.error(err);
        });
}

async function convertPromiseToCallback() {
    try {
        let promise = await convertCallbackToPromise()
        console.log(promise);
    } catch (err) {
        console.error(err);
    }

}

function testConvertPromiseToCallback() {
    convertPromiseToCallback()
}


async function rssFeedReddit() {
    let parser = new Parser();

    try {
        let feed = await parser.parseURL('https://www.reddit.com/.rss')
        console.log(`Title ${feed.title}`);
        feed.items.forEach((el) => {
            console.log(`\tEntry title: ${el.title}`);
            console.log(`\t\tLink: ${el.link}`)
        });
    } catch (err) {
        console.error(err)
    }

}
