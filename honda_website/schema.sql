-- Struktur Tabel Mobil
CREATE TABLE IF NOT EXISTS mobil (
    id_mobil SERIAL PRIMARY KEY,
    nama_mobil VARCHAR(100) NOT NULL,
    harga_otr INT NOT NULL,
    spesifikasi TEXT,
    foto_url VARCHAR(255)
);

-- Struktur Tabel Leasing
CREATE TABLE IF NOT EXISTS leasing (
    id_leasing SERIAL PRIMARY KEY,
    nama_leasing VARCHAR(100) NOT NULL,
    suku_bunga DECIMAL(5,2) NOT NULL,
    logo_url VARCHAR(255)
);

-- Struktur Tabel Sales
CREATE TABLE IF NOT EXISTS sales (
    id_sales SERIAL PRIMARY KEY,
    nama_sales VARCHAR(100) NOT NULL,
    nomor_wa VARCHAR(20) NOT NULL,
    foto_sales VARCHAR(255),
    status_aktif BOOLEAN DEFAULT TRUE
);

-- Data Dummy Mobil
INSERT INTO mobil (nama_mobil, harga_otr, spesifikasi, foto_url) VALUES 
('Honda Brio Satya E MT', 180000000, '1200cc, 5 Seater, Manual', 'Honda Brio Satya E MT.jpg'),
('New Honda HR-V SE', 424000000, '1500cc, 5 Seater, CVT', 'New Honda HR-V SE.jpg'),
('Honda BR-V N7X Edition', 315000000, '1500cc, 7 Seater, CVT', 'Honda BR-V N7X Edition.jpg'),
('All New Honda CR-V', 749000000, '1500cc Turbo, 7 Seater, CVT', 'All New Honda CR-V.jpg');

-- Data Dummy Leasing
INSERT INTO leasing (nama_leasing, suku_bunga, logo_url) VALUES
('BCA Finance', 4.50, 'bca.png'),
('Mandiri Tunas Finance', 4.80, 'mtf.png'),
('Adira Finance', 5.20, 'adira.png');

-- Data Dummy Sales
INSERT INTO sales (nama_sales, nomor_wa, foto_sales, status_aktif) VALUES
('Budi Santoso', '6281234567890', 'budi.jpg', TRUE),
('Sarah Putri', '6289876543210', 'sarah.jpg', TRUE),
('Andi Pratama', '6281122334455', 'andi.jpg', TRUE);