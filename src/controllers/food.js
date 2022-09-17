const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

//#region GetMethods
router.get("/food", (req, res) => {
    const query = ` SELECT * FROM food `;
  
    mysqlConnection.query(query, (err, rows, fields) => {
      if (!err) {
        res.status(200).json(rows);
      } else {
        res.status(500).json({
          message: "Sorry we have an unespected error",
          error : err.sqlMessage
        });
      }
    });
  });
  
  router.get("/food/:id_food", (req, res) => {
    const { id_food } = req.params; // Also you can use this other notation req.params.id to see the param
    const query = ` SELECT * FROM food WHERE id_food = ? `;
  
    mysqlConnection.query(query, [id_food], (err, rows, fields) => {
      if (!err) {
        res.status(200).json(rows);
      } else {
        res.status(500).json({
          message: "Sorry we have an unespected error",
          error: err.sqlMessage
        });
      }
    });
  });

//#region PostMethods
router.post("/food", (req, res) => {
  const { name_food, description, link_photo  } = req.body;
  const query = `INSERT INTO food ( name_food, description, link_photo ) VALUES  (? , ?, ?)`;

  mysqlConnection.query(
    query,
    [name_food, description, link_photo],
    (err, rows, fields) => {
      if (!err) {
        res.status(200).json({
          message: "Your food was created successfully",
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

//#region PutMethods
router.put("/food/:id_food", (req, res) => {
  const { id_food } = req.params;
  const { name_food } = req.body;
  const query = `UPDATE food SET name_food = ?  WHERE id_food = ?`;

  mysqlConnection.query(query, [name_food, id_food], (err, rows, fields) => {
    if (!err) {
      res.status(200).json({
        message: "Your food was updated successfully",
      });
    } else {
      res.status(500).json({
        message: "Sorry we have an unespected error",
        error: err.sqlMessage
      })
    }
  });
});
//#endregion

//#region DeleteMethods
router.delete("/food/:id_food", (req, res) => {
  const { id_food } = req.params;
  const query = `DELETE FROM food WHERE id_food = ?`;

  mysqlConnection.query(query, [id_food], (err, rows, fields) => {
    if (!err) {
      res.status(200).json({
        message: "Your food was deleted successfully",
      });
    } else {
      res.status(500).json({
        message: "Sorry we have an unespected error",
        error : err.sqlMessage
      })
    }         
  });
});

//#endregion
module.exports = router;