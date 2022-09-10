const bcrypt = require("bcrypt");
const router = require('./index.js')

const mysqlConnection = require("../database");

//#region GetMethods
router.get("/nutritionists", (req, res) => {
  const query = ` SELECT * FROM nutritionist `;

  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.status(200).json(rows);
    } else {
      res.status(500).json({
        message: "Sorry we have an unespected error",
        error: err.sqlMessage,
      });
    }
  });
});

router.get("/nutritionists/:id", (req, res) => {
  const { id } = req.params; // Also you can use this other notation req.params.id to see the param
  const query = ` SELECT * FROM nutritionist WHERE id = ? `;

  mysqlConnection.query(query, [id], (err, rows, fields) => {
    if (!err) {
      res.status(200).json(rows);
    } else {
      res.status(500).json({
        message: "Sorry we have an unespected error",
        error: err.sqlMessage,
      });
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
    [name, last_name, user, email, bcrypt.hashSync(password, 10)],
    (err, rows, fields) => {
      if (!err) {
        res.status(200).json({
          message: "Your nutritionis was created successfully",
        });
      } else {
        res.status(500).json({
          message: "Sorry we have an unespected error",
          error: err.sqlMessage,
        });
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
      res.status(200).json({
        message: "Your nutritionis was updated successfully",
      });
    } else {
      res.status(500).json({
        message: "Sorry we have an unespected error",
        error: err.sqlMessage,
      });
    }
  });
});
//#endregion

//#region DeleteMethods
router.delete("/nutritionists/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM nutritionist WHERE id = ?`;

  mysqlConnection.query(query, [id], (err, rows, fields) => {
    if (!err) {
      res.status(200).json({
        message: "Your nutritionis was deleted successfully",
      });
    } else {
      res.status(500).json({
        message: "Sorry we have an unespected error",
        error: err.sqlMessage,
      });
    }
  });
});
//#endregion
