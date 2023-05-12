const router=require('express').Router()

router.route("product/list").get()
router.route("product/category.:id").get()
router.route("product/:id").get()
router.route("product/cart/list").get()
router.route("product/cart/add").post()
router.route("product/cart/update").post()
router.route("product/cart/delete/:id").get()
router.route("product/ratings/:productId").get()
router.route("product/reviews/:productId").get()
router.route("product/add_rating").post()
router.route("product/add_review").post()

module.exports = router
