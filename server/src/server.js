require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('../db/mongoose');
const app = express();
const User = require('../db/Models/User');
const jwt = require('jsonwebtoken');
const Group = require('../db/Models/Group');

const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: `http://localhost:5173`,
    credentials: true
}));
app.use(express.json());

app.post('/login', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const user = await User.findOne({ email, name });
        if (!user) {
            return res.status(400).send({ error: "Invalid Credentials" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).send({ error: "Invalid Credentials" });
        }

        const token = jwt.sign({ user_id: user._id }, `secret`, { expiresIn: '30d' });
        res.status(200).send({ token });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

app.post('/signups', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const user = new User({ email, password, name });
        await user.save();
        const token = jwt.sign({ user_id: user._id }, `secret`, { expiresIn: '30d' });
        res.status(200).send({ token });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
})

app.post('/resetPassword', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send({ error: 'Email is not registered with us' });
        user.password = req.body.password;
        await user.save();
        res.status(200).send('success');
    } catch (e) {
        res.status(400).send(e);
    }
})

app.post('/verifytokenAndGetUsername', async (req, res) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, `secret`);
        const user = await User.findById(decoded.user_id);

        if (!user) {
            return res.status(404).send({ error: 'Invalid or expired token' });
        }

        res.status(200).send({ user: user.name });
    } catch (e) {
        res.status(400).send({ error: 'Invalid or expired token' });
    }
});

app.post('/otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "anmoltutejaserver@gmail.com",
                pass: process.env.NODEMAIL_APP_PASSWORD,
            },
        });

        let mailOptions = {
            from: "anmoltutejaserver@gmail.com",
            to: email,
            subject: 'Your login OTP',
            text: `Your OTP is: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.status(200).send(otp);
        });

    } catch (error) {
        res.status(400).send(error);
    }
});


app.post('/getUser', async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({ name: username });
    if (user) return res.status(200).send(user);
    res.status(400).send("User does not exist in database");
})


app.post('/createGroup', async (req, res) => {
    try {
        const { admin, persons, groupName } = req.body;

        const creator = await User.findOne({ name: admin });

        const group = new Group({
            name: groupName,
            createdBy: creator.email,
            members: [creator.email]
        })
        await group.save();

        for (const person of persons) {
            const user = await User.findOne({ email: person.email });
            if (user) {
                if (!group.members.includes(person.email)) {
                    group.members.push(person.email);
                    user.groups.push(group._id);
                    await user.save();
                }
            }
        }
        creator.groups.push(group._id);
        await creator.save();
        await group.save();
        res.status(200).send(group);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
})

app.post('/getUserGroups', async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ name: username });
        const response = [];

        for (let i = 0; i < user.groups.length; i++) {
            const group = await Group.findById(user.groups[i]);
            response.push({ id: group._id, name: group.name, createdAt: group.createdAt });
        }
        response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.status(200).send(response);
    } catch (e) {
        response.status(400).send(e);
    }
})

app.post('/getgroupData', async (req, res) => {
    const { groupid } = req.body;
    try {
        const group = await Group.findById(groupid);
        res.status(200).send(group);
    } catch (e) {
        res.status(400).send(e);
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})