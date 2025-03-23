from flask import Blueprint, request, jsonify
from models.event import Event  # Import the Event model

event_bp = Blueprint('events', __name__)

# Route to get all events
@event_bp.route('/', methods=['GET'],strict_slashes=False)
def get_events():
    try:
        event_list = Event.get_events()
        return jsonify(event_list)
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500

# Route to create a new event
@event_bp.route('/', methods=['POST'], strict_slashes=False)
def create_event():
    event_data = request.get_json()

    # Check if all required fields are received
    required_fields = ["user_id", "name", "description", "date", "time", "location"]
    missing_fields = [field for field in required_fields if field not in event_data]

    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    # Extract the data
    user_id = event_data.get("user_id")
    name = event_data.get("name")
    description = event_data.get("description")
    date = event_data.get("date")
    time = event_data.get("time")
    location = event_data.get("location")
    
    try:
        # Create the event in the database
        Event.create_event(name, description, date, time, location,user_id)
        
        # Return the created event as a response
        return jsonify({"name": name, "description": description, "date": date, "time": time, "location": location}), 201
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "Unable to create event"}), 500
