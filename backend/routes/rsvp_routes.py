from flask import Blueprint, request, jsonify
from models.rsvp import RSVP
from models.event import Event  # Import Event class

rsvp_routes = Blueprint('rsvp_routes', __name__)

@rsvp_routes.route('/rsvp', methods=['POST'])
def create_rsvp():
    # Validate that all required fields are provided
    user_id = request.json.get('user_id')
    event_id = request.json.get('event_id')
    rsvp_status = request.json.get('status')

    if not user_id or not event_id or not rsvp_status:
        return jsonify({
            'error': 'Missing required fields: user_id, event_id, and status must be provided.'
        }), 400  # Bad Request status code

    try:
        # Check if RSVP already exists
        existing_status = RSVP.get_rsvp_status(user_id, event_id)
        if existing_status is not None:
            return jsonify({
                'message': 'RSVP already exists',
                'status': existing_status,
                'user_id': user_id,
                'event_id': event_id
            }), 409  # Conflict status code
        
        # Check if the event was created by the user
        event_creator = Event.get_event_creator(event_id)
        if event_creator == user_id:
            return jsonify({
                'message': 'User cannot RSVP for their own event',
                'user_id': user_id,
                'event_id': event_id
            }), 403  # Forbidden status code
        
        # Create an RSVP instance and save it
        rsvp = RSVP(user_id=user_id, event_id=event_id, status=rsvp_status)
        rsvp.create_rsvp()
        
        return jsonify({'message': 'RSVP created successfully'}), 201
    except ValueError as e:
        # Handle errors like user or event not found
        return jsonify({'error': str(e)}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@rsvp_routes.route('/rsvp', methods=['GET'])
def get_rsvp():
    # Validate that user_id and event_id are provided
    user_id = request.json.get('user_id')
    event_id = request.json.get('event_id')

    if not user_id or not event_id:
        return jsonify({
            'error': 'Missing required fields: user_id and event_id must be provided.'
        }), 400  # Bad Request status code

    status = RSVP.get_rsvp_status(user_id, event_id)
    print(f"API Response Status: {status}")  # Debugging output
    
    if status is not None:
        return jsonify({
            'message': 'RSVP found',
            'status': status,
            'user_id': user_id,
            'event_id': event_id
        }), 200
    else:
        return jsonify({
            'message': 'No RSVP found',
            'user_id': user_id,
            'event_id': event_id
        }), 404