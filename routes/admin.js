const router = require("express").Router();
const db = require("../config/db");

router.get("/admin/users", (req, res) => {
  db.query("SELECT * FROM users", (err, data) => {
    if (err) return res.status(500).send(err);
    res.json(data);
  });
});

module.exports = router;