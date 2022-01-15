DROP TABLE klien CASCADE;
DROP TABLE barang CASCADE;
DROP TABLE transaksi_barang CASCADE;
DROP TABLE konsultan CASCADE;
DROP TABLE transaksi_konsultasi CASCADE;
DROP TABLE chat CASCADE;

CREATE TABLE IF NOT EXISTS klien (
  "id" SERIAL PRIMARY KEY, 
  nama TEXT NOT NULL,
  alamat TEXT,
  email TEXT NOT NULL,
  picture TEXT
);

CREATE TABLE IF NOT EXISTS barang (
  "id" SERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  harga INT NOT NULL,
  stok INT NOT NULL,
  kategory TEXT,
  picture TEXT
);

CREATE TABLE IF NOT EXISTS transaksi_barang (
  "id" SERIAL PRIMARY KEY,
  klien_id INT REFERENCES klien("id"),
  barang_id INT REFERENCES barang("id"),
  tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
  harga INT NOT NULL,
  qty INT NOT NULL,
  total_harga INT NOT NULL
);

CREATE TABLE IF NOT EXISTS konsultan (
  "id" SERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  email TEXT NOT NULL,
  harga INT NOT NULL,
  picture TEXT
);

CREATE TABLE IF NOT EXISTS transaksi_konsultasi (
  "id" SERIAL PRIMARY KEY,
  klien_id INT REFERENCES klien("id"),
  konsultan_id INT REFERENCES konsultan("id"),
  harga INT NOT NULL,
  qty INT NOT NULL,
  total_tarif INT NOT NULL
);

CREATE TABLE IF NOT EXISTS chat (
  "id" SERIAL PRIMARY KEY,
  klien_id INT REFERENCES klien("id"),
  konsultan_id INT REFERENCES konsultan("id"),
  pesan TEXT NOT NULL
);

INSERT INTO klien (nama, alamat, email) VALUES
  ('Arifin', 'Jakarta', 'arifin@goodgardener.com'),
  ('Maria', 'Jakarta', 'maria@goodgardener.com'),
  ('Jones', 'Jakarta', 'jones@goodgardener.com');

INSERT INTO barang (nama, harga, stok, kategory) VALUES
  ('Pestisida Tanaman Obat Hama Kutu Putih Obat', 60000, 5, 'pestisida'),
  ('Pestisida Tanaman Obat Hama Kutu Putih/PHEFO HCS Organik', 47000, 10, 'pestisida'),
  ('Paket Skincare Kilap Daun Leafshine Pupuk Tanaman', 142000, 3, 'pestisida');

INSERT INTO konsultan (nama, email, harga) VALUES
  ('Will Setiawan', 'willysetiawan@goodgardener.com', 15000),
  ('Muhammad Trinadi', 'muhammadtrinadi@goodgardener.com', 15000),
  ('Steven', 'steven@goodgardener.com', 15000);