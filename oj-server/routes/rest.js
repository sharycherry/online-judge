var problemService = require('../services/problemService')
var problemModel = require('../models/problemModel');
var express = require('express');
var router = express.Router();

router.get("/problems", function (req, res) {
    problemService.getProblems()
        .then(problems => {
            res.header("Access-Control-Allow-Origin", "*");
            console.log('hello'+problems);
            return res.json(problems);
        });
});

router.get("/problems/:id", function (req, res) {
    var id = req.params.id;
    console.log("get id:" + id);
    problemService.getProblem(+id)
        .then(problem => {
            res.header("Access-Control-Allow-Origin", "*");
            res.json(problem)
        });
});

router.post("/problems", function (req, res) {
    console.log("request@problem" + JSON.stringify(req.body));
    problemService.addProblem(req.body)
        .then(function (problem) {
            res.header("Access-Control-Allow-Origin", "*");
            res.json(problem);
        }, function (error) {
            res.header("Access-Control-Allow-Origin", "*");
            res.status(400).send("Problem name already exists!");
        });
});


module.exports = router; 