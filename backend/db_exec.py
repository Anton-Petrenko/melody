import psycopg2

conn = psycopg2.connect("postgresql://postgres:xTPzJjnKNyJTVdDYAafSbduKlnTNceET@crossover.proxy.rlwy.net:14315/railway")
db = conn.cursor()



db.execute("""
    CREATE TABLE user_track_ratings_bad (
        id_user TEXT NOT NULL,
        id_track TEXT NOT NULL,
        elo_rating FLOAT NOT NULL DEFAULT 1500,
        PRIMARY KEY (id_user, id_track)
    );
           
    CREATE TABLE user_track_ratings_ok (
        id_user TEXT NOT NULL,
        id_track TEXT NOT NULL,
        elo_rating FLOAT NOT NULL DEFAULT 1500,
        PRIMARY KEY (id_user, id_track)
    );
           
    CREATE TABLE user_track_ratings_good (
        id_user TEXT NOT NULL,
        id_track TEXT NOT NULL,
        elo_rating FLOAT NOT NULL DEFAULT 1500,
        PRIMARY KEY (id_user, id_track)
    );
""")
conn.commit()



db.close()
conn.close()