const Opinion = require("../models/opinion");

let shortid = require("shortid");

exports.createOpinion = function (req, res) {
    // Todo following this example :
    // let grapes = req.body.grapeTag;
    //TagController.createTagIfNotCreated(grapes, TagController.TAGS_TYPE.CEPAGE)
    Opinion.create(
        {
            id: shortid.generate(),
            id_user: req.body.id_user,
            id_wine: req.body.id_wine,
            price: req.body.price,
            score: req.body.score,
            smell: req.body.smell,
            visual: req.body.visual,
            taste: req.body.taste,
            moment: req.body.moment,
            heat: req.body.heat,
            food: req.body.food,
        },
        function (err, user) {
            // Check if corrects
            console.log(err);
            if (err) return res.status(500).send("There was a problem registering the Opinion.");

            console.log(user);
            // create a token
            res.status(200).send({msg: "Opinion created", wine: user})
        }
    );
}

exports.getOpinionBy = function (req, res) {
    let ret = [];
    let criterias = {};

    //Create criterias json
    if(req.query.criteriaName && req.query.criteriaValue)
        criterias[req.query.criteriaName] = req.query.criteriaValue;

    if(req.query.userid)
        criterias['id_user'] = req.query.userid;

    if(req.query.wineid)
        criterias['id_wine'] = req.query.wineid;

    Opinion.find(criterias, function(err, result) {
        //Error dealing
        if (err) return res.status(500).send("Error on the server.");
        if (!result) return res.status(404).send("No Opinion found.");

        res.status(200).send(result);
    });
}