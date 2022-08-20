const router = require("express").Router();
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;
const Project = require('./../models/Project.model')
const { isAuthenticated } = require("../middlewares/jwt.middleware");
const User = require("../models/User.model");
const Rating = require("../models/Rating.model")

router.get('/getAllProjects', (req, res, next) => {

    Project
        .find()
        .select({ gallery: 1, projectName: 1, city: 1, country: 1, description: 1, location: 1, owner: 1 })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneProject/:project_id', (req, res, next) => {
    const { project_id } = req.params

    Project
        .findById(project_id)
        .populate('owner')
        .populate({
            path: 'testimonials',
            populate: {
                path: 'giver',
                model: 'User'
            }
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/create', isAuthenticated, (req, res, next) => {
    const { projectType, hoursPerWeek, minWeeks, description,
        city, country, continent, latitude, longitude,
        shelterType, gallery, mealsIncluded, languagesSpoken, testimonials, projectName } = req.body
    const { _id: owner } = req.payload

    Project
        .create({
            owner, projectType, hoursPerWeek, minWeeks, description,
            city, country, continent, location: { type: 'Point', coordinates: [latitude, longitude] },
            shelterType, gallery, mealsIncluded, languagesSpoken, testimonials, projectName
        })
        .then(response => {
            return User
                .findByIdAndUpdate(owner, { $push: { owned: response._id } })
                .populate('owned')
        })
        .then(newUser => res.json(newUser))
        .catch(err => console.log(err))
})



router.put('/edit/:project_id', isAuthenticated, (req, res, next) => {
    const { project_id } = req.params

    const { projectType, hoursPerWeek, minWeeks, description,
        city, country, continent, latitude, longitude, shelterType,
        gallery, mealsIncluded, languagesSpoken, testimonials, projectName } = req.body

    const newInfo = {
        projectType, hoursPerWeek, minWeeks, description,
        city, country, continent, location: { type: 'Point', coordinates: [latitude, longitude] }
    }

    Project
        .findByIdAndUpdate(project_id, newInfo, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/details/:project_id', isAuthenticated, (req, res, next) => {
    const { project_id } = req.params
    const { _id } = req.payload

    Project
        .findById(project_id)
        .then(response => {
            const { owner } = response
            return User.findByIdAndUpdate(owner, { $push: { requests: _id } })
        })
        .then(updatedUser => {
            res.json(updatedUser)
        })
        .catch(err => res.status(500).json(err))
})

router.put('/join/:user_id', isAuthenticated, (req, res, next) => {
    const { user_id: requests } = req.params
    const { _id } = req.payload
    User
        .findByIdAndUpdate(_id, { $pull: { requests } })
        .populate('owned')
        .then(response => {
            const project = response.owned.filter(e => e._id !== user_id)
            const project_id = project.length < 2 && project[0]._id
            const joiners = mongoose.Types.ObjectId(user_id)
            return Project.findByIdAndUpdate(project_id, { $push: { joiners } })
        })
        .then(newProject => {
            res.json(newProject)
        })
        .catch(err => res.status(500).json(err))
})

router.put('/deny/:user_id', isAuthenticated, (req, res, next) => {
    const { user_id: requests } = req.params
    const { _id } = req.payload
    User
        .findByIdAndUpdate(_id, { $pull: { requests } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/delete/:project_id', (req, res, next) => {
    const { project_id } = req.params

    Project
        .findByIdAndDelete(project_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router;