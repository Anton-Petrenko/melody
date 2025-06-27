import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

conn = psycopg2.connect(os.environ.get("DATABASE_URL"))
db = conn.cursor()



db.execute("""
    DELETE FROM user_track_ratings_bad;
           
    DELETE FROM user_track_ratings_ok;
           
    DELETE FROM user_track_ratings_good;
""")
conn.commit()



db.close()
conn.close()