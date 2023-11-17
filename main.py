from flask import Flask, request, render_template, jsonify, render_template_string

app = Flask("__main__")


@app.route("/")
def index():

    return render_template("index.html")


@app.route("/submit_number", methods=["POST"])
def submit_number():
    number = request.form['number']

    return f"You entered the number: {number}"
if __name__ == "__main__":
    app.run()

