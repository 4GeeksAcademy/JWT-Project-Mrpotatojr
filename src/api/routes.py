"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException, check_fields
from flask_cors import CORS
from flask_jwt_extended import create_access_token

from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import get_jwt

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


    
@api.route('/registro', methods=['POST'])
def handle_registro():
    response_body = request.get_json()
    print(response_body)
    fields = ["email", "password", "user_name"]
    email, password, user_name = check_fields(response_body, fields)
    new_user = User(email=email, user_name=user_name, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201



@api.route("/login", methods=["POST"])
def handle_login():
    response_body = request.get_json()
    fields = ["email", "password"]
    email, password = check_fields(response_body, fields)
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "Bad email or password"}), 401
    if user.password != password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity={"email": user.email})
    return jsonify(access_token=access_token), 200


@api.route("/token", methods=["GET"])
@jwt_required()
def handle_token():
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"msg": "Missing token"}), 401
    return jsonify({"msg": "Token is valid"}), 200

@api.route("/user/me", methods=["GET"])
@jwt_required()
def handle_user_me():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user["email"]).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404
    return jsonify(user.serialize()), 200