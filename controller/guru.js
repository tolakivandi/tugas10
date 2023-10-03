const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/db.js");

router.get("/", (req, res) => {
  connect.query("SELECT * FROM guru", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data guru",
        payload: rows,
      });
    }
  });
});

router.post(
  "/",
  [
    body("id_mapel").notEmpty(),
    body("nama").notEmpty(),
    body("alamat").notEmpty(),
    body("telepon").notEmpty(),
    body("pendidikan").notEmpty(),
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
      id_mapel: req.body.id_mapel,
      nama: req.body.nama,
      alamat: req.body.alamat,
      telepon: req.body.telepon,
      pendidikan: req.body.pendidikan,
    };
    connect.query("INSERT INTO guru set ? ", data, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: err,
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Data guru",
          payload: data,
        });
      }
    });
  }
);

router.get("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("SELECT * FROM guru WHERE nik=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data guru",
        payload: rows,
      });
    }
  });
});

router.patch(
  "/(:id)",
  [
    body("id_mapel").notEmpty(),
    body("nama").notEmpty(),
    body("alamat").notEmpty(),
    body("telepon").notEmpty(),
    body("pendidikan").notEmpty(),
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
      nama: req.body.nama,
      alamat: req.body.alamat,
      telepon: req.body.telepon,
      pendidikan: req.body.pendidikan,
    };
    connect.query(
      "UPDATE guru set ? WHERE nik=?",
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
            message: "Data guru berhasil diupdate",
            payload: data,
          });
        }
      }
    );
  }
);

router.delete("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("DELETE FROM guru WHERE nik=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data guru berhasil didelete",
      });
    }
  });
});

module.exports = router;
