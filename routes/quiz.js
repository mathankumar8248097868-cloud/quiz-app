const router = require("express").Router();
const db = require("../config/db");

router.post("/submit-score", (req, res) => {
  const { score, participant_no } = req.body;

  if (!participant_no) {
    return res.status(400).json({ success: false, message: "Participant no missing" });
  }

  const sql = "UPDATE users SET score=? WHERE participant_no=?";
  db.query(sql, [score, participant_no], (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err });
    res.json({ success: true, message: "Score updated" });
  });
});

module.exports = router;