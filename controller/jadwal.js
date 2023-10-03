const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/db.js");

router.get("/", (req, res) => {
  connect.query("SELECT * FROM jadwal", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data jadwal",
        payload: rows,
      });
    }
  });
});

router.post(
  "/",
  [
    body("id_jadwal").notEmpty(),
    body("id_mapel").notEmpty(),
    body("id_kelas").notEmpty(),
    body("jam").notEmpty(),
    body("hari").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);

    // if validation failed
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error,
      });
    }

    let data = {
      id_jadwal: req.body.id_jadwal,
      id_mapel: req.body.id_mapel,
      id_kelas: req.body.id_kelas,
      jam: req.body.jam,
      hari: req.body.hari,
    };
    connect.query("INSERT INTO jadwal set ? ", data, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: err,
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Data jadwal",
          payload: data,
        });
      }
    });
  }
);

router.get("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("SELECT * FROM jadwal WHERE id_jadwal=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data jadwal",
        payload: rows,
      });
    }
  });
});

router.patch(
  "/(:id)",
  [
    body("id_mapel").notEmpty(),
    body("id_kelas").notEmpty(),
    body("jam").notEmpty(),
    body("hari").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);

    // if validation failed
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error,
      });
    }

    let id = req.params.id;
    let data = {
      id_mapel: req.body.id_mapel,
      id_kelas: req.body.id_kelas,
      jam: req.body.jam,
      hari: req.body.hari,
    };
    connect.query(
      "UPDATE jadwal set ? WHERE id_jadwal=?",
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
            message: "Data jadwal berhasil diupdate",
            payload: data,
          });
        }
      }
    );
  }
);

router.delete("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("DELETE FROM jadwal WHERE id_jadwal=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data jadwal berhasil didelete",
      });
    }
  });
});

module.exports = router;
