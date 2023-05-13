const router=require('express').Router()
const {registerSeller,loginSeller}=require('../controllers/sellerController')

router.route("/register").post(registerSeller)
router.route("/login").post(loginSeller)
router.route("/product/create").post()
router.route("/product/update").post()
router.route("/product/delete").post()
router.route("/product/image/save").post()

module.exports = router
