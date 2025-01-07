require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('../db/mongoose');
const app = express();
const User = require('../db/Models/User');
const jwt = require('jsonwebtoken');
const Group = require('../db/Models/Group');
const Transaction = require('../db/Models/Transaction');
const Notification = require('../db/Models/Notification');
const Expense = require('../db/Models/Expense');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 8080;

const DemoGroup = "677d96bcd0cc7b8939021119";

app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
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

        const group = await Group.findById(DemoGroup);
        if (!group.members.includes(user.email)) {
            group.members.push(user.email);
            user.groups.push(DemoGroup);
            await user.save();
            await group.save();
        }

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

        const group = await Group.findById(DemoGroup);
        group.members.push(user.email);
        user.groups.push(DemoGroup);
        await user.save();
        await group.save();
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
        console.log(error);
        res.status(400).send(error);
    }
});

app.post('/invite', async (req, res) => {
    try {
        const { email, username } = req.body;
        const user = await User.findOne({ name: username });
        const senderEmail = user.email;

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
            subject: 'Invite To Join',
            text: `${senderEmail} invites You to join SplitEqual ${process.env.FRONTEND_URL}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.status(200).send("success");
        });

    } catch (error) {
        console.log(error);
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
                const notification = new Notification({ to: user._id, text: `${creator.email} added you to group ${groupName}` });
                await notification.save();
            }
        }
        creator.groups.push(group._id);
        await creator.save();
        await group.save();

        const notification = new Notification({ to: creator._id, text: `You created group ${groupName}` });
        await notification.save();

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
        res.status(400).send(e);
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

app.post('/addExpense', async (req, res) => {
    const { groupid, amount, paidBy, description, paidOn } = req.body;

    const group = await Group.findById(groupid);
    const user = await User.findOne({ name: paidBy });

    const transaction = new Transaction({
        groupid: groupid,
        amount: amount,
        paidBy: user.email,
        paidFor: description,
        paidOn: paidOn,
        perPerson: amount / group.members.length
    })

    await transaction.save();
    group.transactions.push(transaction._id);
    await group.save();

    for (let i = 0; i < group.members.length; i++) {
        const usr = await User.findOne({ email: group.members[i] });
        if (usr.email != user.email) {
            const notification = new Notification({ to: usr._id, text: `${user.email} added ${description} amounting $ ${amount} in ${group.name}` });
            await notification.save();
            const exp = new Expense({ to: usr._id, text: `${user.email} lent you ${amount / group.members.length} in ${group.name} for ${description}` });
            await exp.save();
        }
    }

    const notification = new Notification({ to: user._id, text: `You added ${description} amounting $ ${amount} in ${group.name}` });
    await notification.save();

    const exp = new Expense({ to: user._id, text: `You added ${description} amounting $ ${amount} in ${group.name}` });
    await exp.save();

    res.status(200).send(transaction);
})


app.post('/getGroupExpenseHistory', async (req, res) => {
    const { groupid } = req.body;
    const transactions = await Transaction.find({ groupid: groupid }).sort({ paidOn: -1 })
    res.status(200).send(transactions);
})

app.post('/IndividualGroupExpense', async (req, res) => {
    const { groupid } = req.body;
    const group = await Group.findById(groupid);
    const transactions = await Transaction.find({ groupid: groupid });

    const members = group.members;

    const mapping = [];
    for (let i = 0; i < members.length; i++) {
        mapping.push({ "name": members[i], "amount": 0 });
    }

    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        const paidBy = transaction.paidBy;
        const amount = transaction.amount;

        const memberIndex = mapping.findIndex((m) => m.name === paidBy);
        if (memberIndex !== -1) {
            mapping[memberIndex].amount += amount;
        }
    }

    res.status(200).send(mapping);
})


app.post('/getNotifications', async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ name: username });
        const notifications = await Notification.find({ to: user._id }).sort({ timestamp: -1 });
        res.status(200).send(notifications);
    } catch (e) {
        res.status(400).send(e);
    }

})


app.post('/getExpense', async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({ name: username });
    if (user) {
        const expense = await Expense.find({ to: user._id }).sort({ timestamp: -1 });
        return res.status(200).send(expense);
    }
    res.status(400).send("Error");

})

app.post('/getUserData', async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ name: username });
        const response = {
            username: user.name,
            email: user.email,
            JoinedDate: user.JoinedDate,
            groups: user.groups
        }
        return res.status(200).send(response);
    } catch (e) {
        res.status(400).send(e);
    }

})

app.post('/changePassword', async (req, res) => {
    const { username, currPassword, newPassword } = req.body;
    const user = await User.findOne({ name: username });
    try {
        const isValid = await bcrypt.compare(currPassword, user.password);
        if (isValid) {
            user.password = newPassword;
            await user.save();
            return res.status(200).send('success');
        }
        res.status(400).send('Password does not match');
    } catch (e) {
        res.status(400).send(e);
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})