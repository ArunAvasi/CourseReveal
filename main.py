from flask import Flask, request, render_template, jsonify





app = Flask("__main__")


@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run()

