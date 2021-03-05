import os
from functools import wraps
from flask import ( Flask, flash, render_template, redirect,
                    request, session, url_for, abort)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

from sys import getsizeof

if os.path.exists("env.py"):
    import env

app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

DEBUGGING = (os.environ.get("DEBUGGING").lower() == "true")
DEVELOPING = (os.environ.get("DEVELOPING").lower() == "true")

mongo = PyMongo(app)


def dev_only(func):
    """ Disables a wrapped route if not developing """
    @wraps(func)
    def route(*args, **kwargs):
        if DEVELOPING:
            return func(*args, **kwargs)
        else:
            raise Unreachable()
    return route


@app.route("/")
@app.route("/home")
def home():
    return "Downit Home route"

#    id_list = []
#    for id in session["test"]:
#        id_list.append(ObjectId(id))

#    if "test" not in session:
#        session["test"] = []
#    templist = session["test"]
#    templist.append(str(question[0]["_id"]))
#    session["test"] = templist


@app.route("/quiz")
def quiz():
    question = list(mongo.db.questions.aggregate([
        { "$sample" : { "size" : 1 } }
    ]))

    return render_template("quiz.html", questions = question)


@app.route("/leaderboard")
def leaderboard():
    return "Leaderboard here"


@app.route("/answer", methods=["POST"])
def answer():
    return False


#
# Development only routes
#   These routes are to aid development and debugging and
#   will be switched off in production
#
@app.route("/add_question", methods=["GET", "POST"])
@dev_only
def add_question():
    """ Adds a single question to be added to the database. """
    if request.method == "POST":
        new_question = {
            "question" : request.form["question"],
            "options" : [
                request.form["option_one"],
                request.form["option_two"],
                request.form["option_three"],
                request.form["option_four"]
            ],
            "answer" : int(request.form["answer"])
        }
        mongo.db.questions.insert_one(new_question)

    return render_template("add_question.html")

<<<<<<< Updated upstream
=======

@app.route("/all_questions")
@dev_only
def all_questions():
    """ Lists all the questions in the database """
    questions = mongo.db.questions.find()
    return render_template("all_questions.html", questions=questions)

>>>>>>> Stashed changes

if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=DEBUGGING)
