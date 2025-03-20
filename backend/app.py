from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Allow CORS for all routes and allow only the Next.js front-end on port 3000
CORS(app, 
     resources={r"/*": {"origins": "http://localhost:3000", 
                            "methods": ["GET", "POST", "OPTIONS"], 
                            "allow_headers": ["Content-Type"]}},
     support_credentials=True)

# Temporary storage for events
events = [
    {"id": 1, "name": "Event 1", "date": "2025-05-01", "location": "Location A"},
    {"id": 2, "name": "Event 2", "date": "2025-06-15", "location": "Location B"}
]

# Test route to check CORS
@app.route('/test-cors', methods=['GET'])
def test_cors():
    return jsonify({"message": "CORS is working!"})

@app.route('/events', methods=['GET'])
def get_events():
    return jsonify(events)

@app.route('/events', methods=['POST'])
def create_event():
    event_data = request.get_json()
    event_id = len(events) + 1
    new_event = {"id": event_id, **event_data}
    events.append(new_event)
    return jsonify(new_event), 201

if __name__ == '__main__':
    app.run(debug=True, host= '0.0.0.0', port=4000)
