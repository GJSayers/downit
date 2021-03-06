import os
from functools import wraps
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
DEVELOPING = (os.environ.get("DEVELOPING").lower() == "true")

mongo = PyMongo(app)


def dev_only(func):
    """ Disables a wrapped route if not in development. """
    @wraps(func)
    def route(*args, **kwargs):
        if DEVELOPING:
            return func(*args, **kwargs)
        else:
            abort(404)
    return route


@app.route("/")
@app.route("/home")
def home():
    """ Homepage route. """
    return render_template("home.html")

#    id_list = []
#    for id in session["test"]:
#        id_list.append(ObjectId(id))

#    if "test" not in session:
#        session["test"] = []
#    templist = session["test"]
#    templist.append(str(question[0]["_id"]))
#    session["test"] = templist


@app.route("/quiz", methods=["GET", "POST"])
def quiz():
    """ Quiz page route. """
    if request.method == "POST":
        if 'player-name' in request.form:
            session['player'] = request.form['player-name']

    question = list(mongo.db.questions.aggregate([
        { "$sample" : { "size" : 1 } }
    ]))

    return render_template("quiz.html", question = question[0])


@app.route("/leaderboard")
def leaderboard():
    """ Leaderboard route """
    return "Leaderboard here"


@app.route("/AJAX_answer", methods=["POST"])
def answer():
    """ Accepts an answer as an ajax request and returns if it is correct. """
    return False


#
# Development only routes
#   These routes are to aid development and debugging and
#   will be switched off in production
#
@app.route("/add_question", methods=["GET", "POST"])
@dev_only
def add_question():
    """ Adds a single question to the database. """
    if request.method == "POST":
        new_question = {
            "question" : request.form["question"],
            "options" : [
                request.form["option_1"],
                request.form["option_2"],
                request.form["option_3"],
                request.form["option_4"]
            ],
            "answer" : int(request.form["answer"])
        }
        mongo.db.questions.insert_one(new_question)

    return render_template("add_question.html")


@app.route("/upload_questions")
@dev_only
def upload_questions():
    """ Bulk uploads questions in JSON format to the database. """
    """
    questions = [
    {
        "question" : "?",
        "options" : [
            "",
            "",
            "",
            ""
        ],
        "answer" :
    }]
    mongo.db.questions.insert(questions)
    """
    return "Uploaded questions"


@app.route("/all_questions")
@dev_only
def all_questions():
    """ Lists all the questions in the database. """
    questions = mongo.db.questions.find()
    return render_template("all_questions.html", questions=questions)


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=DEBUGGING)
