/* 
    Convert to JSON
    add the item in second file
    read the file
    again convert back to Object
    print it
*/

const bioData = {
    name: 'John',
    age: 20,
    gender: 'male'
};

// 1
const Json = JSON.stringify(bioData);

// 2
const fs = require('fs');
fs.writeFile('jsonData.json', Json, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log('done')
    }
});

// 3 and 4
fs.readFile('./jsonData.json', "utf-8",(err, data) => {
    // console.log(data)

    const convertedData = JSON.parse(data);
    console.log(convertedData)
});
