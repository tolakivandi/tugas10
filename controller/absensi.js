const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/db.js");

router.get("/", (req, res) => {
  connect.query("SELECT * FROM absensi", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data absensi",
        payload: rows,
      });
    }
  });
});

router.post(
  "/",
  [
    body("id_siswa").notEmpty(),
    body("jam_masuk").notEmpty(),
    body("jam_keluar").notEmpty(),
    body("tanggal").notEmpty(),
    body("status_absen").notEmpty(),
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
      id_siswa: req.body.id_siswa,
      jam_masuk: req.body.jam_masuk,
      jam_keluar: req.body.jam_keluar,
      tanggal: req.body.tanggal,
      status_absen: req.body.status_absen,
    };
    connect.query("INSERT INTO absensi set ? ", data, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: err,
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Data absen",
          payload: data,
        });
      }
    });
  }
);

router.get("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("SELECT * FROM absensi WHERE id_siswa=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data absensi",
        payload: rows,
      });
    }
  });
});

router.patch(
  "/(:id)",
  [
    body("id_siswa").notEmpty(),
    body("jam_masuk").notEmpty(),
    body("jam_keluar").notEmpty(),
    body("tanggal").notEmpty(),
    body("status_absen").notEmpty(),
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
      id_siswa: req.body.id_siswa,
      jam_masuk: req.body.jam_masuk,
      jam_keluar: req.body.jam_keluar,
      tanggal: req.body.tanggal,
      status_absen: req.body.status_absen,
    };
    connect.query(
      "UPDATE absensi set ? WHERE id_siswa=?",
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
            message: "Data absensi berhasil diupdate",
            payload: data,
          });
        }
      }
    );
  }
);

router.delete("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("DELETE FROM absensi WHERE id_siswa=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data absensi berhasil didelete",
      });
    }
  });
});

module.exports = router;
