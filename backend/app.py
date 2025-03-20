from flask import Flask, request, jsonify
from flask_cors import CORS
from neo4j_connection import Neo4jConnection

app = Flask(__name__)

# Set up the Neo4j connection
conn = Neo4jConnection("bolt://localhost:7687", "neo4j", "78827882")

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

# Function to create a new event in the Neo4j database
def create_event_in_db(name, date, location):
    query = (
        "CREATE (e:Event {name: $name, date: $date, location: $location}) "
        "RETURN e"
    )
    conn.query(query, parameters={"name": name, "date": date, "location": location})

# Test route to check CORS
@app.route('/test-cors', methods=['GET'])
def test_cors():
    return jsonify({"message": "CORS is working!"})

@app.route('/events', methods=['GET'])
def get_events():
    query = "MATCH (e:Event) RETURN e"
    result, session = conn.query(query)
    records = [record for record in result]
    session.close()

    try:
        event_list = []
        for record in records:
            event = record["e"]
            event_list.append({
                "id": event.id,
                "name": event["name"],
                "date": event["date"],
                "location": event["location"]
            })
        print("Event list:", event_list)
        return jsonify(event_list)
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route('/events', methods=['POST'])
def create_event():
    event_data = request.get_json()
    name = event_data.get("name")
    date = event_data.get("date")
    location = event_data.get("location")
    
    # Create the event in the database
    create_event_in_db(name, date, location)
    
    # Return the created event as a response
    return jsonify({"name": name, "date": date, "location": location}), 201

if __name__ == '__main__':
    app.run(debug=True, host= '0.0.0.0', port=4000)
