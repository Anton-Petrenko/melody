import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

conn = psycopg2.connect(os.environ.get("DATABASE_URL"))
db = conn.cursor()



db.execute("""
    CREATE TABLE user_track_ratings_bad (
        id_user TEXT NOT NULL,
        id_track TEXT NOT NULL,
        index INTEGER NOT NULL,
        PRIMARY KEY (id_user, id_track)
    );

    CREATE TABLE user_track_ratings_ok (
        id_user TEXT NOT NULL,
        id_track TEXT NOT NULL,
        index INTEGER NOT NULL,
        PRIMARY KEY (id_user, id_track)
    );

    CREATE TABLE user_track_ratings_good (
        id_user TEXT NOT NULL,
        id_track TEXT NOT NULL,
        index INTEGER NOT NULL,
        PRIMARY KEY (id_user, id_track)
    );
""")
conn.commit()



db.close()
conn.close()