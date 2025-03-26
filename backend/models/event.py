import uuid
from neo4j_connection import Neo4jConnection

# Set up the Neo4j connection
conn = Neo4jConnection("bolt://localhost:7687", "neo4j", "78827882")

class Event:
    @staticmethod
    def create_event(name, description, date, time, location, user_id):
        # Generate a unique event ID (UUID)
        event_id = str(uuid.uuid4())

        # First, create the event node with the unique event_id
        create_event_query = (
            "CREATE (e:Event {event_id: $event_id, name: $name, description: $description, date: $date, time: $time , location: $location}) "
            "RETURN e"
        )
        event_result, session = conn.query(create_event_query, parameters={
            "event_id": event_id,
            "name": name,
            "description": description,
            "date": date,
            "time": time,
            "location": location
        })
        
       # Ensure event was created
        created_event = event_result.single()
        if not created_event:
            session.close()
            raise Exception("Failed to create event.")

        # Now, create a relationship between the user and the event
        create_relationship_query = (
            "MATCH (u:User {user_id: $user_id}), (e:Event {event_id: $event_id}) "
            "MERGE (u)-[:CREATED]->(e)"
        )
        session.run(create_relationship_query, parameters={"user_id": user_id, "event_id": event_id})

        return created_event  # Return the created event for the response

    @staticmethod
    def get_events():
        query = "MATCH (e:Event) RETURN e"
        result, session = conn.query(query)
        records = [record for record in result]
        session.close()

        event_list = []
        for record in records:
            event = record["e"]
            event_list.append({
                "event_id": event["event_id"],
                "name": event["name"],
                "description": event["description"],
                "time": event["time"],
                "date": event["date"],
                "location": event["location"]
            })
        return event_list

    @staticmethod
    def get_event_creator(event_id):
        query = """
        MATCH (e:Event {event_id: $event_id})<-[:CREATED]-(u:User)
        RETURN u.user_id AS creator_id
        """
        
        result, session = conn.query(query, parameters={"event_id": event_id})
        creator = result.single()
        session.close()  # Close the session after fetching the result
        
        return creator['creator_id'] if creator else None
