const router = require("express").Router();
const db = require("../config/db");

function generateParticipant() {
  return "P" + Math.floor(100000 + Math.random() * 900000);
}

router.post("/register", (req, res) => {
  const { name, email } = req.body;
  const participant = generateParticipant();

  const sql = "INSERT INTO users (name,email,participant_no) VALUES (?,?,?)";

  db.query(sql, [name, email, participant], (err, result) => {
    if (err) return res.status(500).send(err);

    req.session.userId = result.insertId;
    req.session.participant = participant;

    res.json({
      success: true,
      participant
    });
  });
});

module.exports = router;