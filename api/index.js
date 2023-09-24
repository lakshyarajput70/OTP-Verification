const express = require('express');
var bodyParser = require('body-parser')
const textflow = require("textflow.js")

// G2i91EmmNRr6mzmAATzjhZJGzRN3N7gJHuJsfXjRyhsHLBq7Cu4zDki4ZT1YLsAQ

// K6re4KhmDu0HTK2hEfqqyXoC9TLvkO6dmlVolYw6sfY2yaJefrJbBKz0nMoVbwhh
textflow.useKey("K6re4KhmDu0HTK2hEfqqyXoC9TLvkO6dmlVolYw6sfY2yaJefrJbBKz0nMoVbwhh")

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/verification", async (req, res) => {
    const { phoneNumber, code } = req.body

    var result = await textflow.verifyCode(phoneNumber, code);

    if(!result.valid){
        return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true });
    // return res.status(400).json({ success: false });
})


app.post("/sendOTP", async (req, res) => {
    const { phoneNumber } = req.body

    var result = await textflow.sendVerificationSMS(phoneNumber);

    if (result.ok) //send sms here
        return res.status(200).json({ success: true });

    return res.status(400).json({ success: false });
})

app.listen(2000);