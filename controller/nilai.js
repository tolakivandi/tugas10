const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/db.js");

router.get("/", (req, res) => {
  connect.query("SELECT * FROM nilai", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data nilai",
        payload: rows,
      });
    }
  });
});

router.post(
  "/",
  [
    body("id_Siswa").notEmpty(),
    body("id_Guru").notEmpty(),
    body("id_Mapel").notEmpty(),
    body("Nilai").notEmpty(),
   
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
      id_Siswa: req.body.id_Siswa,
      id_Guru: req.body.id_Guru,
      id_Mapel: req.body.id_Mapel,
      Nilai: req.body.Nilai,
      
    };
    connect.query("INSERT INTO nilai set ? ", data, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: err,
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Data nilai",
          payload: data,
        });
      }
    });
  }
);

router.get("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("SELECT * FROM nilai WHERE id_Nilai=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data nilai",
        payload: rows,
      });
    }
  });
});

router.patch(
  "/(:id)",
  [
    body("id_Siswa").notEmpty(),
    body("id_Guru").notEmpty(),
    body("id_Mapel").notEmpty(),
    body("Nilai").notEmpty(),
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
      id_Siswa: req.body.id_Siswa,
      id_Guru: req.body.id_Guru,
      id_Mapel: req.body.id_Mapel,
      Nilai: req.body.Nilai,
    };
    connect.query(
      "UPDATE Nilai set ? WHERE id_Nilai=?",
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
            message: "Data nilai berhasil diupdate",
            payload: data,
          });
        }
      }
    );
  }
);

router.delete("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("DELETE FROM Nilai  WHERE id_Nilai=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data nilai berhasil didelete",
      });
    }
  });
});

module.exports = router;
