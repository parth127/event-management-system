from neo4j_connection import Neo4jConnection
from models.user import User  # Import User class
from models.event import Event  # Import Event class

conn = Neo4jConnection("bolt://localhost:7687", "neo4j", "78827882")

class RSVP:
    def __init__(self, user_id, event_id, status):
        self.user_id = user_id
        self.event_id = event_id
        self.status = status

    def create_rsvp(self):
        # Check if user exists using user_id
        user = User.find_by_user_id(self.user_id)  # Check by user_id
        if user is None:
            raise Exception("User does not exist.")
        
        # Check if event exists
        events = Event.get_events()
        event_exists = any(event['event_id'] == self.event_id for event in events)
        if not event_exists:
            raise Exception("Event does not exist.")
        
        # Proceed to create RSVP if both exist
        query = """
        MERGE (u:User {user_id: $user_id})
        MERGE (e:Event {event_id: $event_id})
        MERGE (u)-[r:RSVP {status: $status}]->(e)
        RETURN u, e, r
        """
        result, session = conn.query(query, parameters={
            "user_id": self.user_id,
            "event_id": self.event_id,
            "status": self.status
        })
        
        # Fetch the result before closing the session
        rsvp_result = result.single()
        session.close()  # Close the session after fetching the result
        return rsvp_result

    @staticmethod
    def get_rsvp_status(user_id, event_id):
        query = """
        MATCH (u:User {user_id: $user_id})-[r:RSVP]->(e:Event {event_id: $event_id})
        RETURN r.status AS status
        """
        
        result, session = conn.query(query, parameters={
            "user_id": user_id,
            "event_id": event_id
        })
        
        # Fetch the result before closing the session
        rsvp = result.single()
        session.close()  # Close the session after fetching the result
        
        # Debugging output
        if rsvp:
            return rsvp['status']  # Directly return the status
        else:
            print("No RSVP found for the given user_id and event_id.")
            return None