const express = require("express");
const book = require("../controllers/book.controller"); 
const authentication = require("../controllers/authentication.controller");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router
  .route("/")
  .get(book.findAll)
  .post(
    authentication.authenticateJWT,
    upload.array("bookImg"), 
    book.create 
  );

router
  .route("/:id")
  .get(book.findOne)
  .patch(
    authentication.authenticateJWT,
    upload.array("bookImg"), 
    book.update 
  )
  .delete(authentication.authenticateJWT, book.delete);

// New route to update quality
router
  .patch(
    "/:id/quality", 
    authentication.authenticateJWT, 
    book.updateQuality
  );

module.exports = router;
