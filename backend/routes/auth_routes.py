from flask import Blueprint, request, jsonify
from models.user import User

auth_bp = Blueprint('auth', __name__)

# User Registration Route
@auth_bp.route('/register', methods=['POST'])
def register_user():
    try:
        data = request.get_json()
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        password = data.get("password")
        
        
        # Ensure all fields are provided
        if not all([first_name, last_name, email, password]):
            return jsonify({"error": "All fields (First Name, Last Name, Email, Password) are required"}), 400
        
        # Create a new user instance
        new_user = User(first_name, last_name, email, password)
        
        # Save the user to the database
        new_user.save()
        
        return jsonify({"message": "User registered successfully", "user_id": new_user.user_id}), 201
    
    except ValueError as e:
        # Email already exists
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# User Login Route
@auth_bp.route('/login', methods=['POST'])
def login_user():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        
        # Ensure email and password are provided
        if not all([email, password]):
            return jsonify({"error": "Email and Password are required"}), 400
        
        # Find the user by email
        user_data = User.find_by_email(email)
        if not user_data:
            return jsonify({"error": "Invalid credentials"}), 401
        
        # Verify the provided password
        if User.verify_password(user_data["password"], password):
            return jsonify({"message": "Login successful", "user_id": user_data["user_id"]}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
