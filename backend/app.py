"""
Simple Flask backend that receives JSON form submissions.
"""

from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route("/", methods=["GET"])
def health_check():
    """Health endpoint to confirm backend is running."""
    return jsonify({"status": "ok", "message": "Flask backend is running"}), 200


@app.route("/submit", methods=["POST"])
def submit_form():
    """
    Accept JSON payload from frontend and return confirmation response.
    """
    received_data = request.get_json(silent=True) or {}

    response = {
        "status": "success",
        "message": "Form submitted successfully",
        "data": received_data,
    }
    return jsonify(response), 200


if __name__ == "__main__":
    # Host 0.0.0.0 is required so Docker can expose the app outside container.
    app.run(host="0.0.0.0", port=5000, debug=False)
