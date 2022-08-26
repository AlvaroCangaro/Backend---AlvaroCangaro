process.on('message', (cant) => {
    const obj = {};

    for (let i = 0; i < cant; i++) {
        const randomNumber = Math.ceil(Math.random() * 1000);

        if (obj.hasOwnProperty(randomNumber)) {
            obj[randomNumber]++;
        } else {
            obj[randomNumber] = 1;
        }
    }

    process.send(obj);
    process.exit();
});