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


def get_question_list():
    """ Returns the list of questions already asked. """
    if "questions" not in session:
        session["questions"] = []

    id_list = []
    for id in session["questions"]:
        id_list.append(ObjectId(id))

    return id_list


def add_question_list(id):
    """ Adds a question to the list of asked questions. Takes ObjectId. """
    if "questions" not in session:
        session["questions"] = []

    session["questions"].append(str(id))


@app.route("/")
@app.route("/home")
def home():
    """ Homepage route. """
    return render_template("home.html")


@app.route("/quiz", methods=["POST"])
def quiz():
    """ Quiz page route. """

    if 'player_name' in request.form:
        session['player'] = request.form['player_name']



    #Get the list of questions already asked
    exclude_list = get_question_list()
    ##Get the next question
    question = list(mongo.db.questions.aggregate([
        #Excludes questions already asked
        { "$match" : { "_id" : {"$nin" : exclude_list} }},
        #Returns one random record
        { "$sample" : { "size" : 1 } }
    ]))
    #We shouldn't run out of questions, but just in case
    if question == []:
        return redirect("finished")

    add_question_list(question[0]["_id"])

    return render_template("quiz.html", question = question[0])


@app.route("/finished")
def finished():
    """ Called when the game ends. """
    #The game has finished, so clear the asked questions list
    if "questions" in session:
        session["questions"] = []

    return "Game Over"


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
