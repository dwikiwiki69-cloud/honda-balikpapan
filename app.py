from flask import Flask, render_template, request
import psycopg2
import psycopg2.extras
import os

app = Flask(__name__)

def get_db_connection():
    # Mengambil nilai pemboleh ubah persekitaran DATABASE_URL dari Vercel
    database_url = os.environ.get('DATABASE_URL')
    
    if database_url:
        # Jika pautan awan wujud (di pelayan Vercel), gunakan ini
        return psycopg2.connect(database_url)
    else:
        # Jika tiada (di localhost laptop), gunakan pangkalan data tempatan
        return psycopg2.connect(
            host="localhost",
            database="db_honda",
            user="postgres",
            password="dw274305", # Ganti dengan password PostgreSQL Anda
            port=5432,
            client_encoding='utf8'
        )

@app.route('/')
def home():
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cursor.execute("SELECT * FROM mobil")
    katalog_mobil = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('index.html', mobil=katalog_mobil)

@app.route('/detail')
def detail():
    id_mobil = request.args.get('id', type=int)
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    
    if id_mobil:
        cursor.execute("SELECT * FROM mobil WHERE id_mobil = %s", (id_mobil,))
        data_mobil = cursor.fetchone()
    else:
        # Jika tidak ada ID di URL, tampilkan mobil pertama
        cursor.execute("SELECT * FROM mobil ORDER BY id_mobil ASC LIMIT 1")
        data_mobil = cursor.fetchone()
        
    cursor.close()
    conn.close()
    return render_template('detail.html', mobil=data_mobil)

@app.route('/simulasi')
def simulasi():
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cursor.execute("SELECT * FROM leasing")
    data_leasing = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('simulasi.html', leasing=data_leasing)

@app.route('/sales')
def sales():
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cursor.execute("SELECT * FROM sales WHERE status_aktif = TRUE ORDER BY RANDOM()")
    data_sales = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('sales.html', sales=data_sales)

if __name__ == '__main__':
    app.run(debug=True)