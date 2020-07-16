const router = require('express').Router();
const bodyParser = require('body-parser');
const Contact = require('../../models/Contact');
const User = require('../../models/User');
const mongoose = require('mongoose');
const moment = require('moment');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/**
 * Create Contact
 */
router.post('/create', async (req, res) => {
    try {

        const userId = req.user._id;
        const { _id: contactId } = await Contact.create({ ...req.body, creator: userId });

        const data = await User.findByIdAndUpdate(
            userId,
            { $push: { contacts: contactId } },
            { new: true, useFindAndModify: false }
        );
        // const data2 = await User.findById(userId);

        return res.status(200).json({ status: 'success', userId })
    } catch (error) {
        res.status(500).json({ status: 'fail', error: error.message })
    }
})

/**
 * Get All Contacts
 */
router.get('/all', async (req, res) => {
    try {
        const userId = req.user._id;
        const data = await Contact.find({ creator: userId })

        return res.status(200).json({ status: 'success', data })
    } catch (error) {
        res.status(500).json({ status: 'fail', error: error.message })
    }
})

/**mongoose.set('useCreateIndex', true);
 * Update Contact
 */
router.put('/:id', async (req, res) => {
    try {
        const contactId = req.params.id;

        const data = await Contact.findByIdAndUpdate(
            contactId, { ...req.body }, { new: true }
        );

        return res.status(200).json({ status: 'success', data })
    } catch (error) {
        res.status(500).json({ status: 'fail', error: error.message })
    }
})

/**
 * Delete Contact
 */
router.delete('/:id', async (req, res) => {
    try {
        const contactId = req.params.id;
        const userId = req.user._id;

        const data = await Contact.findByIdAndDelete(
            contactId
        );

        if (data) {
            await User.findByIdAndUpdate(userId,
                { $pull: { contacts: contactId } },
            );
        }

        return res.status(200).json({ status: 'success', data })
    } catch (error) {
        res.status(500).json({ status: 'fail', error: error.message })
    }
})

/**
 * View a contact
 */
router.get('/:id', async (req, res) => {
    try {
        const contactId = req.params.id;
        let data;
        let today = new Date()
            .toISOString()
            .slice(0, 10)
            .toString();
        let weekAgoDate = moment().subtract(7, 'd').format('YYYY-MM-DD');
        let tomorrow = moment().add(1, 'd').format('YYYY-MM-DD');
        // increment todays contact views count
        data = await Contact.findOneAndUpdate({
            'views.date': today
        }, {
            '$inc': {
                'views.$.count': 1,
                totalViews: 1
            },
        }, { new: true })

        // create todays contact views count
        if (!data) {
            data = await Contact.findByIdAndUpdate(contactId, { $push: { views: { date: today } }, $inc: { totalViews: 1 } }, { new: true })
        }
        // console.log(contactId);

        const viewsForGraph = await Contact.aggregate([
            { "$match": { _id: mongoose.Types.ObjectId(contactId) } },
            {
                "$project": {
                    "views": {
                        "$filter": {
                            "input": '$views',
                            "as": 'item',
                            "cond": {
                                "$and": [
                                    { "$gt": ['$$item.date', new Date(weekAgoDate)] },
                                    { "$lt": ['$$item.date', new Date(tomorrow)] }
                                ]
                            }
                        }
                    },
                }
            }
        ])

        data.views = viewsForGraph[0].views;

        return res.status(200).json({ status: 'success', data })
    } catch (error) {
        res.status(500).json({ status: 'fail', error: error.message })
    }
})

module.exports = router;