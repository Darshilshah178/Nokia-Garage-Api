const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// get a list of bookings from db
router.get('/bookings', async (req, res, next) => {
    try{
        const booking = await Booking.find({});
        res.send(booking);
    }catch{
        console.log('get booking error', e);
        next
    }
});

// add a new booking to db
router.post('/bookings',async (req, res, next) => {
    try {
        const startDate = new Date(req.body.dateTimeFrom)
        startDate.setDate(startDate.getDate())
        const endDate = new Date(req.body.dateTimeTo)
        endDate.setDate(endDate.getDate())
        const checkBooking = await Booking.find({
            $or: [
               {$and: [
                 {dateTimeFrom:{$gte: startDate}}, {dateTimeFrom:{$lte: endDate}}
               ]},
               {dateTimeFrom:{$lte: startDate}, dateTimeTo:{$gte: startDate}}
            ]
         }).exec();
        if (checkBooking && checkBooking.length > 0){
            res.status(200).json({ message: "This time is already booked" });
        }
        else {
            req.body.dateTimeFrom = startDate;
                req.body.dateTimeTo = endDate;
                const booking = await Booking.create(req.body);
                console.log('Create New Booking',booking);
                res.send(booking);
        }
         console.log ( checkBooking)
    } catch (e){
        console.log('post booking error', e);
        next
    }
});

//update a booking in db
router.put('/bookings/:id', async (req, res, next) => {
    try{
        const booking = await Booking.findByIdAndUpdate({_id: req.params.id}, req.body)
        res.send(booking);
    }catch (e){
        console.error('edit booking error',e);
        next;
  }
   
});

//delete a booking form db
router.delete('/bookings/:id', async (req, res, next) => {
    try{
        const booking = await Booking.findByIdAndRemove({_id: req.params.id})
        res.send(booking);
    }catch (e){
        console.error('delete booking error',e);
        next;
  }
});

module.exports = router;



/* {
    "ownerUserId":"61a4bc92907b743bf87c30a0",
    "dateTimeFrom":"2021-11-30T00:00:00.000+00:00",
    "dateTimeTo":"2021-11-30T00:00:00.000+00:00",
    "url":"asduh",
    "name":"Printer 4"
        
    } */