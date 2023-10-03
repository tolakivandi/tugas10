const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/db.js");

router.get("/", (req, res) => {
  connect.query("SELECT * FROM mapel", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data mapel",
        payload: rows,
      });
    }
  });
});

router.post("/", [body("mapel").notEmpty()], (req, res) => {
  const error = validationResult(req);

  // if validation failed
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error,
    });
  }

  let data = {
    mapel: req.body.mapel,
  };
  connect.query("INSERT INTO mapel set ? ", data, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(201).json({
        status: true,
        message: "Data mapel",
        payload: data,
      });
    }
  });
});

router.get("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("SELECT * FROM mapel WHERE id_mapel=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data mapel",
        payload: rows,
      });
    }
  });
});

router.patch("/(:id)", [body("mapel").notEmpty()], (req, res) => {
  const error = validationResult(req);

  // if validation failed
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error,
    });
  }

  let id = req.params.id;
  let data = {
    mapel: req.body.mapel,
  };
  connect.query(
    "UPDATE mapel set ? WHERE id_mapel=?",
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
          message: "Data mapel berhasil diupdate",
          payload: data,
        });
      }
    }
  );
});

router.delete("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("DELETE FROM mapel WHERE id_mapel=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data mapel berhasil didelete",
      });
    }
  });
});

module.exports = router;
