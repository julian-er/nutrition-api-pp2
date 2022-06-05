const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

//#region GetMethods
router.get("/patients", (req, res) => {
  const query = ` SELECT * FROM patients `;

  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//#endregion
module.exports = router;
