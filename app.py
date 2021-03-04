import os
from flask import ( Flask, flash, render_template, redirect,
                    request, session, url_for, abort)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

if os.path.exists("env.py"):
    import env

app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")
DEBUGGING = (os.environ.get("DEBUGGING").lower() == "true")

mongo = PyMongo(app)


@app.route("/")
@app.route("/home")
def home():
    return "Downit Home route"


@app.route("/quiz")
def quiz():
    question = mongo.db.questions.aggregate([{ "$sample" : { "size" : 1 } }])
    return render_template("quiz.html", questions = question)


@app.route("/leaderboard")
def leaderboard():
    return "Leaderboard here"


@app.route("/answer", methods=["POST"])
def answer():
    return False

if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=DEBUGGING)
