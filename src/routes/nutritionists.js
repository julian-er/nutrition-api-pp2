const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

//#region GetMethods
router.get("/nutritionists", (req, res) => {
  const query = ` SELECT * FROM nutritionist `;

  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get("/nutritionists/:id", (req, res) => {
  const { id } = req.params; // Also you can use this other notation req.params.id to see the param
  const query = ` SELECT * FROM nutritionist WHERE id = ? `;

  mysqlConnection.query(query, [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//#endregion

//#region PostMethods
router.post("/nutritionists", (req, res) => {
  const { name, last_name, user, email, password } = req.body;
  const query = `INSERT INTO nutritionist ( name, last_name, user, email, password) VALUES  (? , ? , ? , ? , ?)`;

  mysqlConnection.query(
    query,
    [name, last_name, user, email, password],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          statusCode: 200,
          message: "Your nutritionis was created successfully",
        });
      } else {
        console.log(err);
      }
    }
  );
});
//#endregion

//#region PutMethods
router.put("/nutritionists/:id", (req, res) => {
  const { id } = req.params;
  const { name, last_name } = req.body;
  const query = `UPDATE nutritionist SET name = ? , last_name = ? WHERE id = ?`;

  mysqlConnection.query(query, [name, last_name, id], (err, rows, fields) => {
    if (!err) {
      res.json({
        statusCode: 200,
        message: "Your nutritionis was updated successfully",
      });
    } else {
      console.log(err);
    }
  });
});
//#endregion

//#region PutMethods
router.delete("/nutritionists/:id", (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM nutritionist WHERE id = ?`;
  
    mysqlConnection.query(query, [id], (err, rows, fields) => {
      if (!err) {
        res.json({
          statusCode: 200,
          message: "Your nutritionis was deleted successfully",
        });
      } else {
        console.log(err);
      }
    });
  });
  //#endregion
module.exports = router;
