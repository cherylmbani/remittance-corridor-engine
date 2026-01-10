from flask import Flask, request, make_response, session, jsonify
from flask_cors import CORS
from models import User, Country, Corridor, Rate, Transaction, db, migrate, bcrypt
from flask_restful import Api, Resource



app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///remittance.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
app.config['SECRET_KEY']='super_secret'
app.json.compact=False

CORS(app)
db.init_app(app)
migrate.init_app(app, db)
bcrypt.init_app(app)
api=Api(app)

class Start(Resource):
    def get(self):
        response={'message': 'Welcome to Remittance Corridor Engine!'}
        return response, 200
    
api.add_resource(Start, '/welcome')

if __name__=='__main__':
    app.run(port=5555, debug=True)

