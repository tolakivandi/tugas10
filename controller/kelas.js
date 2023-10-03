const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/db.js");

router.get("/", (req, res) => {
  connect.query("SELECT * FROM kelas", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data kelas",
        payload: rows,
      });
    }
  });
});

router.post("/",
    [body("kelas")
    .notEmpty()]
, (req, res) => {
  const error = validationResult(req);

  // if validation failed
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error,
    });
  }

  let data = {
    kelas: req.body.kelas,
  };
  connect.query("INSERT INTO kelas set ? ", data, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(201).json({
        status: true,
        message: "Data kelas",
        payload: data,
      });
    }
  });
});

router.get("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("SELECT * FROM kelas WHERE id_kelas=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data kelas",
        payload: rows,
      });
    }
  });
});

router.patch("/(:id)", [body("kelas").notEmpty()], (req, res) => {
  const error = validationResult(req);

  // if validation failed
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error,
    });
  }

  let id = req.params.id;
  let data = {
    kelas: req.body.kelas,
  };
  connect.query(
    "UPDATE kelas set ? WHERE id_kelas=?",
    [data, id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data kelas berhasil diupdate",
          payload: data,
        });
      }
    }
  );
});

router.delete("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query(
    "DELETE FROM kelas WHERE id_kelas=?",
    id,
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data kelas berhasil didelete",
        });
      }
    }
  );
});

module.exports = router;
