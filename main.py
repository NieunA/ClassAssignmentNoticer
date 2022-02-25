import csv

from flask import (
    Flask,
    abort,
    jsonify,
    render_template,
    request,
    send_file,
    send_from_directory,
)

app = Flask(__name__)

with open("data/data.csv", "r", encoding="UTF-8") as file:
    reader = csv.reader(file)
    data = {(row[0], row[1]): row[2] for row in reader}


def find(oldID, name):
    return data.get((oldID, name))


@app.route("/")
def main():
    return send_from_directory("static", "mainPage.html")


@app.route("/check", methods=["POST"])
def check():
    if request.method == "POST":
        reqData = request.get_json()
        studentID = reqData["studentID"]
        name = reqData["name"]
        return jsonify(
            {"success": True if find(studentID, name) is not None else False}
        )


@app.route("/result", methods=["GET"])
def result():
    if request.method == "GET":
        reqData = request.args
        oldID = reqData["oldID"]
        name = reqData["name"]
        std = find(oldID, name)
        if std is not None:
            return render_template("result.html", name=name, studentID=std)
        else:
            # No result found
            abort(404)


@app.route("/<path:path>")
def static_file(path):
    return send_file("static/" + path)


app.run(host="0.0.0.0", port=5000)
