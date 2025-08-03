const express = require('express')
const app = express();
const port = 8000;
const mongoose = require('mongoose')
mongoose.createConnection('mongodb://localhost:27017/practice_db')
    .then(() => {
        console.log('DB created successfully!');
    })
    .catch(() => {
        console.log('Something went wrong! Please try again');
    })

const PracticeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    middle_name: {
        type: String
    },
    last_name: {
        type: String,
        require: true
    },
    dob: {
        type: Date,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: Number,
        require: true
    },
    create_password: {
        type: String,
        require: true
    }
})

const PracticeModel = mongoose.model('myUserdata', PracticeSchema)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post('/register', async (req, res) => {
    const body = req.body
    if (!body || !body.first_name || !body.last_name || !body.dob || !body.email || !body.phone || !body.create_password) {
        res.json({ 'msg': 'All * fields are required!' })
    } else {
        const practice = await PracticeModel.create({
            first_name: body.first_name,
            middle_name: body.middle_name,
            last_name: body.last_name,
            dob: body.dob,
            email: body.email,
            phone: body.phone,
            create_password: body.create_password
        })
        if (practice) {
            res.json({ 'msg': 'User created successfully.' })
        } else {
            res.json({ 'msg': 'Something went wrong!' })
        }
    }
})

app.get('/see', async (req, res) => {
    const data = await PracticeModel.find()
    res.json(data)
})

app.put('/update/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    if (!body || !body.first_name || !body.last_name || !body.dob || !body.email || !body.phone || !body.create_password) {
        res.json({ 'msg': 'All * fields are required!' })
    }

    else {
        const practice = await PracticeModel.findByIdAndUpdate(id, {
            first_name: body.first_name,
            middle_name: body.middle_name,
            last_name: body.last_name,
            dob: body.dob,
            email: body.email,
            phone: body.phone,
            create_password: body.create_password
        })
        if (practice) {
            res.json({ 'msg': 'User updated successfully.' })
        } else {
            res.json({ 'msg': 'Something went wrong!' })
        }
    }
})

app.delete('/dlt/:id', async (req, res) => {
    const id = req.params.id
    const db = await PracticeModel.findByIdAndDelete(id)
    if (db) {
        res.json({ 'msg': 'User deleted!' })
    } else {
        res.json({ 'msg': 'Something went wrong!' })
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});