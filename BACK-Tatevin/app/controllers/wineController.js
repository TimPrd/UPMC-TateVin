const Wine = require("../models/wine");
const TagController = require("./tagController");
const OpinionController = require("./opinionController");

let shortid = require("shortid");

exports.findAll = function (req, res) {
    var perPage = 6
    var page = req.params.page || 1

    Wine
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec(function(err, wines) {
          Wine.count().exec( function(err, count) {
              if (err) return next(err)
              res.status(200).send({
                  wines: wines,
                  current: page,
                  pages: Math.ceil(count / perPage)
              })
          })
      })
};


exports.findOneWine = function (req, res) {
    Wine.findOne({_id: req.params.wine_id}, async function(error, result) {
        let ret = [];

        if(error)
            res.status(500).send(error);

        ret.push(result);

        // Go get wine score
        let jsonOpinion = { wine_id: result._id };
        let opinions = await OpinionController.getScoreByWine(jsonOpinion);
        let score = await this.getAvgScore(opinions);
        let price = await this.getAvgPrice(opinions);

        ret.push(await score);
        ret.push(await price);

        // if all ok
        res.status(200).send(ret);
    })
};

exports.createWine = function (req, res) {
    //let grapes = req.body.grapeTag;
    //TagController.createTagIfNotCreated(grapes, TagController.TAGS_TYPE.CEPAGE)
    Wine.create(
        {
            id:shortid.generate(),
            name: req.body.name,
            millesime: req.body.millesime, //Millesime
            terroir: null,
            domain: null,
            type: req.body.type,
            classification: null,
            gaz: null,
            grape: null,
            keep_in_cave: null,
            decantation: null, //Carrafage
        },
        function (err, user) {
            // Check if corrects

            if (err) return res.status(500).send("There was a problem registering the Wine.");

            // create a token
            res.status(200).send({msg: "Wine created", wine: user})
        }
    );
}
exports.addCB=function(req, res){
    Wine.findByIdAndUpdate(
        req.params.id_wine,
        {barcode:req.body.barcode},
        {new: true},
        (err, newWine) => {
            if (err) return res.status(500).send(err);
            return res.send(newWine);
        }
    )
}

exports.addProdComment = function (req,res){
    Wine.findByIdAndUpdate(
        req.params.id_wine,
        { "producer.comment" : req.body.commentProd},
        {new: true},
        (err, newWine) => {
            if (err) return res.status(500).send(err);
            return res.send(newWine);
        }
    )
}

exports.addProd = function (req,res){
    Wine.findByIdAndUpdate(
        req.params.id_wine,
        { "producer.id_Prod" :req.params.id_prod},
        {new: true},
        (err, newWine) => {
            if (err) return res.status(500).send(err);
            return res.send(newWine);
        }
    )
}

exports.modifyWine = function (req, res) {

    Wine.findByIdAndUpdate(
        req.params.wine_id,
        req.body.params,
        {new: true},
        (err, newWine) => {
            if (err) return res.status(500).send(err);
            return res.send(newWine);
        }
    )
}


/************************SEARCH**********************************/

exports.searchWine = async function (query) {

    return await Wine.find(query, async function (err, ws) {

        return await ws;
    });
}

exports.addComment=function (req, res){
    console.log("ajoutComment")
    Wine.findOneAndUpdate({_id:req.body.id_ws},
        { $addToSet: { comments: req.body.id_comment } }
        ,function(err, ws){
        if (err) return res.status(500).send(err);
        console.log(req.body.id_comment)
        return res.status(200).send({msg: "WS commented! "});
    });

}

exports.findOneWineByBarCode=function(req,res){

    Wine.findOne({barcode:req.query.barCode}, function(err, wine){
        if (err) return res.status(500).send(err);

        res.json(wine)
    })
}
exports.findByStory=function(req,res){
    Wine.find({ '_id' : { $in: req.query.wines } }, function(err, comments){
        if (err) {
          res.send(err);
        }

        res.json(comments);
    });
}
/********************GET WINE INFORMATION ***********************/
getAvgScore = async function (scoreArray) {
    let nbVote = 0;
    let sumScore = 0;
    let ret;

    for(let i=0; i<scoreArray.length; i++) {
        if(scoreArray[i].score) {
            nbVote++;
            sumScore += scoreArray[i].score;
        }
    }


    ret = await {score: Number((sumScore/nbVote).toFixed(2)), nbVote: nbVote};

    return await ret;
}

getAvgPrice = async function (priceArray) {
    let nb = 0;
    let sumPrice = 0;
    let ret;

    for(let i=0; i<priceArray.length; i++) {
        if(priceArray[i].price) {
            nb++;
            sumPrice += priceArray[i].price;
        }
    }

    ret = await {price: Number((sumPrice/nb).toFixed(2)), nb: nb};

    return await ret;
}
