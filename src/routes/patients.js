const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

//#region GetMethodss 
router.get("/patients", (req, res) => {
  const query = ` SELECT * FROM patients `;

  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.status(200).json(rows);
    } else {
      res.status(500).json({
        message: "Sorry we have an unespected error",
        error: err
      });
    }
  });
});

//#endregion

//#region PostMethods
router.post("/patients", (req, res) => {
  const { name, last_name } = req.body;
  const query = `INSERT INTO patients ( name, last_name ) VALUES  (? , ?)`;

  mysqlConnection.query(
    query,
    [name, last_name],
    (err, rows, fields) => {
      if (!err) {
        res.status(200).json({
          message: "Your patients was created successfully",
        });
      } else {
        res.status(500).json({
          message: "Sorry we have an unespected error",
          error: err.sqlMessage
        })
      }
    }
  );
});
//#endregion
module.exports = router;
