const token = require('../services/jwt');
const watchlist = require('../models/Watchlist');
const user = require('../models/User');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const bcrypt = require('bcryptjs');


module.exports = (app) => {

    ///Create a new Watchlist
    app.post('/api/createWatchlist', requireLogin, async (req, res, next) => {
        console.log(req.body)
        const sub = req.user.sub
        const {title} = req.body
        // const userLists = await Watchlist.find(userId);
        const newWatchlist = new watchlist({ title, body: [], _user: sub })
        try {
            await newWatchlist.save();
            res.send(newWatchlist);
            // res.send(userLists);
        } catch (err) {
            res.status(422).send(err);
          }
      });

    ///Get all watchlist names
    app.get('/api/getWatchlists', requireLogin, async (req, res, next) => {
        const sub = req.user.sub
        const userLists = await watchlist.find({_user: sub})
        const selectList = await user.find({_id: sub})

        if(!userLists) res.send('Create a watchlist')
        const lists = [...userLists]
        //convert
        var result = {};
        for (var i = 0; i < lists.length; i++) {
            result[lists[i].title] = lists[i].body;
        }
        const list = Object.keys(result)
        const delist = [selectList[0].watchlist]
        const select = {list: list, select: delist[0]}

        res.send(select)
    })

    ///Get all watchlists
    app.get('/api/getWatchlists/:id', requireLogin, async (req, res, next) => {
        const sub = req.user.sub
        const userLists = await watchlist.find({_user: sub})

        if(!userLists) res.send(['Create a watchlist'])
        const lists = [...userLists]
        //convert
        var result = {};
        for (var i = 0; i < lists.length; i++) {
            result[lists[i].title] = lists[i].body;
        }
        const list = Object.values(result)
        const listName = Object.keys(result)

        const select = list[req.params.id]
        const name = listName[req.params.id]

        const resend = {
            select,
            name
        }

        res.send(resend)
    })




    ///Delete a watchlist
    app.get('/api/deleteWatchlist/:title', requireLogin, async (req, res, next) => {
        const sub = req.user.sub;
        // console.log(del)
        try {
            const r = await watchlist.find({_user: sub, title: req.params.title})
            console.log(r[0]._id)
            const d = await watchlist.deleteOne({_id: r[0]._id})
            // watchlist.deleteOne({_id:_id},function(err,question){
            //     if(err) throw err;
            //     console.log('the document is deleted')        
            // });
            const userLists = await watchlist.find({_user: sub});
            const lists = [...userLists];
            //convert
            var result = {};
            for (var i = 0; i < lists.length; i++) {
                result[lists[i].title] = lists[i].body;
            }
            const listName = Object.keys(result)
            res.json(listName)
        } catch (err) {
            res.status(422).send(err);
        }

    });

    //Edit a watchlist
    app.put('/api/editWatchlist/:title', requireLogin, async (req, res, next) => {
        // console.log(req.body)
        const sub = req.user.sub;
        watchlist.updateOne({_user: sub, title: req.params.title}, {$set:{body: req.body.body.stocks, types: req.body.body.types}})
            .then(watch => res.json(watch))
            .catch(err => res.status(404).json({success: false}));
    })

    //Clear a watchlist
    app.get('/api/clearWatchlist/:title', requireLogin, async (req, res, next) => {
        // console.log(req.body)
        const sub = req.user.sub;
        watchlist.updateOne({_user: sub, title: req.params.title}, {$set:{body: [], types: []}})
            .then(watch => console.log(watch))
            .catch(err => res.status(404).json({success: false}));
        const userLists = await watchlist.find({_user: sub, title: req.params.title})
        if(!userLists) res.send('Create a watchlist')

        const lists = []
        const typeit = []

        const select = {list: lists, types: typeit}

        res.send(select)
        
    })

    //Update User Watchlist
    app.get('/api/updateUserWatchlist/:number', requireLogin, async (req, res, next) => {
        const sub = req.user.sub;
        await user.updateOne({_id: sub}, {$set:{watchlist: req.params.number}})
        try {
            const existinguser = await user.findOne({_id: sub})
            res.send(existinguser)
        } catch (err) {
            res.status(404).json({msg: err})
        }
    })

    ///Rename a Watchlist
    app.put('/api/renameWatchlist/:name', requireLogin, async (req, res, next) => {
        console.log(req.body.body)
        const sub = req.user.sub;
        await watchlist.updateOne({_user: sub, title: req.params.name}, {$set:{title: req.body.body}})
        const userLists = await watchlist.find({_user: sub})

        if(!userLists) res.send('Create a watchlist')
        const lists = [...userLists]
        //convert
        var result = {};
        for (var i = 0; i < lists.length; i++) {
            result[lists[i].title] = lists[i].body;
        }
        const list = Object.keys(result)
        const select = {list: list}

        res.send(select)
    })
    
    // .stocks, types: req.body.body.types


    // app.get('/api/getWatchlist/:id', requireLogin, async (req, res, next) => {
    //     const list = req.params
    //     console.log(list)
    //     const sub = req.user.sub
    //     const userLists = await watchlist.find({_user: sub})

    //     if(!userLists) res.send('Create a watchlist')
    //     const lists = [...userLists]
    //     //convert
    //     var result = {};
    //     for (var i = 0; i < lists.length; i++) {
    //         result[lists[i].title] = lists[i].body;
    //     }

    //     res.send(result)
    // })
}