import psycopg2

conn = psycopg2.connect("postgresql://postgres:xTPzJjnKNyJTVdDYAafSbduKlnTNceET@crossover.proxy.rlwy.net:14315/railway")
db = conn.cursor()



db.execute("""
    DELETE FROM user_track_ratings_bad;
           
    DELETE FROM user_track_ratings_ok;
           
    DELETE FROM user_track_ratings_good;
""")
conn.commit()



db.close()
conn.close()