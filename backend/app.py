import util
import psycopg2
from flask_cors import CORS
from flask import Flask, jsonify, request

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

conn = psycopg2.connect("postgresql://postgres:xTPzJjnKNyJTVdDYAafSbduKlnTNceET@crossover.proxy.rlwy.net:14315/railway")

@app.route("/ratings", methods=["GET", "POST"])
def ratings():

    if request.method == "GET":
        ret = {
            "bad": [],
            "ok": [],
            "good": []
        }

        id_user = request.args.get("user", "null")
        if id_user == "null": return {"error": "Missing a valid 'user' parameter."}, 400
        
        db = conn.cursor()
        db.execute("""
            SELECT id_track
            FROM user_track_ratings_bad
            WHERE id_user = %s
            ORDER BY index ASC;
        """, (id_user, ))
        data: list[tuple[str]] = db.fetchall()
        for row in data:
            ret["bad"].append(row[0])
        
        db.execute("""
            SELECT id_track
            FROM user_track_ratings_ok
            WHERE id_user = %s
            ORDER BY index ASC;
        """, (id_user, ))
        data: list[tuple[str]] = db.fetchall()
        for row in data:
            ret["ok"].append(row[0])

        db.execute("""
            SELECT id_track
            FROM user_track_ratings_good
            WHERE id_user = %s
            ORDER BY index ASC;
        """, (id_user, ))
        data: list[tuple[str]] = db.fetchall()
        for row in data:
            ret["good"].append(row[0])

        return jsonify(ret), 200
    
    elif request.method == "POST":
        
        client_ratings: util.MelodyUserRatings = request.get_json()

        id_user = request.args.get("user", "null")
        if id_user == "null": return {"error": "Missing a valid 'user' parameter."}, 400

        db = conn.cursor()
        for i, id_track in enumerate(client_ratings["bad"]):
            db.execute("""
                INSERT INTO user_track_ratings_bad (id_user, id_track, index)
                VALUES (%s, %s, %s)
                ON CONFLICT (id_user, id_track)
                DO UPDATE SET index = EXCLUDED.index
            """, (id_user, id_track, i))
        for i, id_track in enumerate(client_ratings["ok"]):
            db.execute("""
                INSERT INTO user_track_ratings_ok (id_user, id_track, index)
                VALUES (%s, %s, %s)
                ON CONFLICT (id_user, id_track)
                DO UPDATE SET index = EXCLUDED.index
            """, (id_user, id_track, i))
        for i, id_track in enumerate(client_ratings["good"]):
            db.execute("""
                INSERT INTO user_track_ratings_good (id_user, id_track, index)
                VALUES (%s, %s, %s)
                ON CONFLICT (id_user, id_track)
                DO UPDATE SET index = EXCLUDED.index
            """, (id_user, id_track, i))
        conn.commit()

        return jsonify({ "message": "Melody database ratings updated." }), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)