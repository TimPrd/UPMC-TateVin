var express = require("express");
var router = express.Router();
var path    = require("path");

const userController = require("./../controllers/userController");
const wineStoryController = require("./../controllers/wineStoryController");
const wineController = require("./../controllers/wineController");
const tagController = require("./../controllers/tagController");

const Quagga = require('quagga').default;



//HOME
router.route("/").all(function(req, res) {
  res.sendFile(path.join(__dirname+'/../../dist/index.html'));
  // prod => res.sendFile(path.join(__dirname+'/../../dist/index.html'));
});


/********************************************
 *                ROADS : Tag               *
 ********************************************/

/*===========*
 *   Type    *
 *===========*/

/* fetch all the users */
router.get("/tags",  tagController.findAll)

router
  .post("/tag", tagController.createTag);

/*===========*
 * Instance  *
 *===========*/

/**~~~~~~~~~~~~~~~END Tag~~~~~~~~~~~~~~~~~**/

/********************************************
 *              ROADS : USERS               *
 ********************************************/

/*===========*
 *   Type    *
 *===========*/
router
  .get("/users", userController.findAllUser)
  .post("/register", userController.register)
  .post("/login", userController.login)
  .get("/account", userController.account);

/*===========*
 * Instance  *
 *===========*/
router
  .get("/users/:user_id", userController.findOneUser) //need to remove password
  .put("/users/:user_id", userController.updateUser)
  .delete("/users/:user_id", userController.deleteUser);

/**~~~~~~~~~~~~~~~~~END USER~~~~~~~~~~~~~~~~~**/

/********************************************
 *                ROADS : Wine              *
 ********************************************/

/*===========*
 *   Type    *
 *===========*/

/* fetch all the users */
router.get("/wines",  wineController.findAll)

router
  .post("/wine", wineController.createWine);

/*===========*
 * Instance  *
 *===========*/

/**~~~~~~~~~~~~~~~END Wine~~~~~~~~~~~~~~~~~**/


/********************************************
 *           ROADS : Wine Story             *
 ********************************************/

/*===========*
 *   Type    *
 *===========*/

/* fetch all the users */
router.get("/wineStory",  wineStoryController.findAll)

router
  .post("/wineStory", wineStoryController.createWS);

/*===========*
 * Instance  *
 *===========*/

/**~~~~~~~~~~~~~~~~~END WS~~~~~~~~~~~~~~~~~**/



module.exports = router;
