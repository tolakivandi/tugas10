const express = require("express");
const app = express();
const port = 8080;

const routekelas = require("./controller/kelas");
const routemapel = require("./controller/mapel");
const routejadwal = require("./controller/jadwal");
const routeguru = require("./controller/guru");
const routeabsensi = require("./controller/absensi");
const routesiswa = require("./controller/siswa");
const routenilai = require("./controller/nilai");
//res.send('halo lovedek')

//app.listen(port, () => {
//console.log(`aplikasi berjalan di http://locallhost:${port}`);
//});

const bodyPs = require("body-parser");
app.use(bodyPs.urlencoded({ extended: false }));
app.use(bodyPs.json());

app.use("/api/kelas", routekelas);
app.use("/api/mapel", routemapel);
app.use("/api/jadwal", routejadwal);
app.use("/api/guru", routeguru);
app.use("/api/absensi", routeabsensi);
app.use("/api/siswa", routesiswa);
app.use("/api/nilai", routenilai);


app.listen(port, () => {
  console.log(`aplikasi berjalan di http::/localhost:${port}`);
});
