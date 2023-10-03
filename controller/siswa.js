const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/db.js");

router.get("/", (req, res) => {
  connect.query("SELECT * FROM siswa", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data siswa",
        payload: rows,
      });
    }
  });
});

router.post(
  "/",
  [
    body("nama").notEmpty(),
    body("id_kelas").notEmpty(),
    body("email").notEmpty(),
    body("password").notEmpty(),
    body("gender").notEmpty(),
    body("birthday").notEmpty(),
    body("telpon").notEmpty(),
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
      nama: req.body.nama,
      id_kelas: req.body.id_kelas,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      birthday: req.body.birthday,
      telpon: req.body.telpon,
    };
    connect.query("INSERT INTO siswa set ? ", data, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: err,
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Data siswa",
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
    body("nama").notEmpty(),
    body("id_kelas").notEmpty(),
    body("email").notEmpty(),
    body("password").notEmpty(),
    body("gender").notEmpty(),
    body("birthday").notEmpty(),
    body("telpon").notEmpty(),
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
      nama: req.body.nama,
      id_kelas: req.body.id_kelas,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      birthday: req.body.birthday,
      telpon: req.body.telpon,
    };
    connect.query(
      "UPDATE siswa set ? WHERE id_siswa=?",
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
            message: "Data siswa berhasil diupdate",
            payload: data,
          });
        }
      }
    );
  }
);

router.delete("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("DELETE FROM siswa WHERE id_siswa=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data siswa berhasil didelete",
      });
    }
  });
});

module.exports = router;
