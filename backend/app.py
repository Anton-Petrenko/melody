import psycopg2
from flask_cors import CORS
from flask import Flask, jsonify, request


app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

conn = psycopg2.connect("postgresql://postgres:xTPzJjnKNyJTVdDYAafSbduKlnTNceET@crossover.proxy.rlwy.net:14315/railway")

@app.route("/ratings", methods=["GET"])
def ratings():

    ret = {
        "bad": [],
        "ok": [],
        "good": []
    }

    id_user = request.args.get("user", "null")
    if id_user == "null": return {"error": "Missing a valid 'user' parameter."}, 400
    
    db = conn.cursor()
    db.execute("""
        SELECT id_track, elo_rating
        FROM user_track_ratings_bad
        WHERE id_user = %s
        ORDER BY elo_rating ASC;
    """, (id_user, ))
    data: list[tuple[str, float]] = db.fetchall()
    for row in data:
        ret["bad"].append({ "id_track": row[0], "elo_rating": row[1] })
    
    db.execute("""
        SELECT id_track, elo_rating
        FROM user_track_ratings_ok
        WHERE id_user = %s
        ORDER BY elo_rating ASC;
    """, (id_user, ))
    data: list[tuple[str, float]] = db.fetchall()
    for row in data:
        ret["ok"].append({ "id_track": row[0], "elo_rating": row[1] })

    db.execute("""
        SELECT id_track, elo_rating
        FROM user_track_ratings_good
        WHERE id_user = %s
        ORDER BY elo_rating ASC;
    """, (id_user, ))
    data: list[tuple[str, float]] = db.fetchall()
    for row in data:
        ret["good"].append({ "id_track": row[0], "elo_rating": row[1] })

    return jsonify(ret)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)