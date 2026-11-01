document.addEventListener("DOMContentLoaded", function() {
    const hargaInput = document.getElementById("harga_otr");
    const dpInput = document.getElementById("dp_persen");
    const tenorSelect = document.getElementById("tenor");
    const leasingSelect = document.getElementById("leasing");
    const dpText = document.getElementById("dp_nominal_text");
    const hasilCicilan = document.getElementById("hasil_cicilan");

    // Fungsi untuk mengubah angka biasa menjadi format ribuan (misal: 180000000 -> 180.000.000)
    function formatRupiah(angka) {
        let numberString = angka.toString().replace(/[^,\d]/g, '');
        let split = numberString.split(',');
        let sisa = split[0].length % 3;
        let rupiah = split[0].substr(0, sisa);
        let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        if (ribuan) {
            let separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        return split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    }

    // Event listener agar input Harga OTR otomatis terformat saat user mengetik
    if (hargaInput) {
        hargaInput.addEventListener("input", function(e) {
            let nilaiBersih = this.value.replace(/\D/g, ''); // Hapus semua karakter selain angka
            this.value = formatRupiah(nilaiBersih);
            hitungKredit();
        });
    }

    function hitungKredit() {
        if (!hargaInput || !dpInput || !tenorSelect || !leasingSelect) return;

        // Ambil angka murni dari input harga (menghapus titik)
        const harga = parseFloat(hargaInput.value.replace(/\./g, '')) || 0;
        const dpPersen = parseFloat(dpInput.value) || 0;
        const tenorTahun = parseInt(tenorSelect.value) || 1;
        const sukuBunga = parseFloat(leasingSelect.value) || 0;

        // 1. Hitung Nominal DP
        const nominalDP = harga * (dpPersen / 100);
        if (dpText) {
            dpText.innerText = "Nominal DP: Rp " + Math.round(nominalDP).toLocaleString("id-ID");
        }

        // 2. Hitung Pokok Hutang
        const pokokHutang = harga - nominalDP;

        // 3. Hitung Total Bunga Flat
        const totalBunga = pokokHutang * (sukuBunga / 100) * tenorTahun;

        // 4. Hitung Angsuran per Bulan
        const totalHutang = pokokHutang + totalBunga;
        const cicilanBulan = totalHutang / (tenorTahun * 12);

        // 5. Tampilkan Hasil
        if (hasilCicilan) {
            hasilCicilan.innerText = "Rp " + Math.round(cicilanBulan).toLocaleString("id-ID") + " / bulan";
        }
    }

    // Listener untuk field lainnya
    if (dpInput) dpInput.addEventListener("input", hitungKredit);
    if (tenorSelect) tenorSelect.addEventListener("change", hitungKredit);
    if (leasingSelect) leasingSelect.addEventListener("change", hitungKredit);

    // Hitung otomatis saat halaman pertama kali dimuat
    hitungKredit();
});