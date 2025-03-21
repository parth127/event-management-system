import uuid
from flask_bcrypt import Bcrypt
from neo4j_connection import Neo4jConnection

# Initialize bcrypt for password hashing
bcrypt = Bcrypt()

# Set up Neo4j connection
conn = Neo4jConnection("bolt://localhost:7687", "neo4j", "78827882")

# User class to handle user-related operations
class User:
    def __init__(self, first_name, last_name, email, password):
        self.user_id = self.generate_user_id()
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password

    @staticmethod
    def generate_user_id():
        # Generate a unique UserID using UUID
        return str(uuid.uuid4())

    def save(self):
        # Hash password before saving
        hashed_password = bcrypt.generate_password_hash(self.password).decode('utf-8')

        # Check if the user with this email or user_id already exists
        if self.is_email_taken(self.email):
            raise ValueError("Email already exists")

        # Create user in the database
        query = (
            "CREATE (u:User {user_id: $user_id, first_name: $first_name, last_name: $last_name, email: $email, password: $password}) "
            "RETURN u"
        )
        
        conn.query(query, parameters={
            "user_id": self.user_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "password": hashed_password
        })

    @staticmethod
    def is_email_taken(email):
        # Check if a user with the given email already exists
        query = "MATCH (u:User {email: $email}) RETURN u"
        result, session = conn.query(query, parameters={"email": email})
        record = result.single()
        session.close()

        return record is not None

    @staticmethod
    def find_by_email(email):
        query = "MATCH (u:User {email: $email}) RETURN u"
        result, session = conn.query(query, parameters={"email": email})
        record = result.single()
        session.close()

        if record:
            user_data = record["u"]
            return user_data
        return None

    @staticmethod
    def verify_password(stored_password, provided_password):
        return bcrypt.check_password_hash(stored_password, provided_password)
