from flask import Flask, request, jsonify
from flask_cors import CORS
from neo4j_connection import Neo4jConnection

from routes.auth_routes import auth_bp
from events.routes import event_bp
from routes.rsvp_routes import rsvp_routes

app = Flask(__name__)

# Set up the Neo4j connection
conn = Neo4jConnection("bolt://localhost:7687", "neo4j", "78827882")

# Allow CORS for all routes and allow only the Next.js front-end on port 3000
CORS(app, 
     resources={r"/*": {"origins": "http://localhost:3000", 
                            "methods": ["GET", "POST", "OPTIONS"], 
                            "allow_headers": ["Content-Type"]}},
     support_credentials=True)

@app.route('/test-cors', methods=['GET'])
def test_cors():
    return jsonify({"message": "CORS is working!"})

# Register the auth blueprint
app.register_blueprint(auth_bp, url_prefix="/auth")

# Register the events blueprint
app.register_blueprint(event_bp, url_prefix="/events")

# Register the RSVP blueprint
app.register_blueprint(rsvp_routes, url_prefix="/rsvp")

if __name__ == '__main__':
    app.run(debug=True, host= '0.0.0.0', port=4000)
