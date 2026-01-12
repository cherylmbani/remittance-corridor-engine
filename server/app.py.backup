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

#aAuthentication routes

class Signup(Resource):
    def post(self):

        data=request.get_json()
        existing_user=User.query.filter_by(email=data['email']).first()
        if existing_user:
            return {"error": " Email already exists!"}, 400
        new_user=User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=data['password']

        )
        
        db.session.add(new_user)
        db.session.commit()
        new_user_dict=new_user.to_dict()
        response_body=make_response(new_user_dict, 201)
        return response_body

class Login(Resource):
    def post(self):
        data=request.get_json()
        if not data:
            return {'error': 'Please fill in all the fields'}
        email=data['email']
        password=data['password']
        if not email or not password:
            return {'error': 'Both email and password required'}, 404
        user=User.query.filter_by(email=email).first()
        if user and user.authenticate(password):
            session['user_id']=user.id
            user_dict=user.to_dict()
            response=make_response(user_dict, 200)
            return response
        else:
            response_body={"error":"Invalid email or password"}
            return response_body, 400

class Logout(Resource):
    def post(self):
        session.pop('user_id', None)
        response_body={'message': "Logged out successfully!"}
        response=make_response(response_body, 200)
        return response

class UserResource(Resource):
    def get(self):
        users=[user.to_dict() for user in User.query.all()]
        response=make_response(users, 200)
        return response
    
    def post(self):
        data=request.get_json()
        existing_user=User.query.filter_by(email=data.get('email')).first()
        if existing_user:
            return {'error': "User already exists!"}
        user=User(
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            email=data.get('email'),
            password=data.get('password')
        )
        db.session.add(user)
        db.session.commit()

        response=make_response(user.to_dict(), 201)
        return response

#User model
class UserById(Resource):
    def get(self, id):
        user=User.query.filter_by(id=id).first()
        if not user:
            return {'error': "User does not exist"}, 404
        response=make_response(user.to_dict(), 200)
        return response
    
    def patch(self, id):
        user=User.query.filter_by(id=id).first()
        if not user:
            return {'error': 'User does not exist'}, 404
        
        data=request.get_json()
        if 'first_name' in data:
            user.first_name=data.get('first_name')
        if "last_name" in data:
            user.last_name=data.get('last_name')
        if 'email' in data:
            user.email=data.get('email')
        if "password" in data:
            user.password=data.get('password')

        db.session.commit()
        response=make_response(user.to_dict(), 200)
        return response
    
    def delete(self, id):
        user=User.query.filter_by(id=id).first()
        if not user:
            return {'error': 'User does not exist'}, 404
        db.session.delete(user)
        db.session.commit()
        
        response_body={'message':'User deleted successfully'}
        response=make_response(response_body, 200)
        return response

# Country model
class CountryResource(Resource):
    def get(self):
        countries=[country.to_dict() for country in Country.query.all()]
        response=make_response(countries, 200)
        return response
    
    def post(self):
        data=request.get_json()
        existing_country=Country.query.filter_by(name=data.get('name')).first()
        if existing_country:
            return {'error': "Country already exists!"}, 404
        country=Country(
            name=data.get('name'),
            code=data.get('code')
        )
        db.session.add(country)
        db.session.commit()

        response=make_response(country.to_dict(), 201)
        return response

class CountryById(Resource):
    def get(self, id):
        country=Country.query.filter_by(id=id).first()
        if not country:
            return {'error': "Country does not exist"}, 404
        response=make_response(country.to_dict(), 200)
        return response
    
    def patch(self, id):
        country=Country.query.filter_by(id=id).first()
        if not country:
            return {'error': 'Country does not exist'}, 404
        
        data=request.get_json()
        if 'name' in data:
            country.name=data.get('name')
        if "code" in data:
            country.code=data.get('code')

        db.session.commit()
        response=make_response(country.to_dict(), 200)
        return response
    
    def delete(self, id):
        country=Country.query.filter_by(id=id).first()
        if not country:
            return {'error': 'Country does not exist'}, 404
        db.session.delete(country)
        db.session.commit()
        
        response_body={'message':'Country deleted successfully'}
        response=make_response(response_body, 200)
        return response     

#Corridor model
class CorridorResource(Resource):
    def get(self):
        corridors=[corridor.to_dict() for corridor in Corridor.query.all()]
        response=make_response(corridors, 200)
        return response
    
    def post(self):
        data=request.get_json()
        existing_corridor=Corridor.query.filter_by(
            from_country=data.get('from_country'),
            to_country=data.get('to_country')
        ).first()
        if existing_corridor:
            return {'error': "Corridor already exists!"}, 404
        corridor=Corridor(
            from_country=data.get('from_country'),
            to_country=data.get('to_country')
        )
        db.session.add(corridor)
        db.session.commit()

        response=make_response(corridor.to_dict(), 201)
        return response

class CorridorById(Resource):
    def get(self, id):
        corridor=Corridor.query.filter_by(id=id).first()
        if not corridor:
            return {'error': "Corridor does not exist"}, 404
        response=make_response(corridor.to_dict(), 200)
        return response
    
    def patch(self, id):
        corridor=Corridor.query.filter_by(id=id).first()
        if not corridor:
            return {'error': 'Corridor does not exist'}, 404
        
        data=request.get_json()
        if 'from_country' in data:
            corridor.from_country=data.get('from_country')
        if "to_country" in data:
            corridor.to_country=data.get('to_country')

        db.session.commit()
        response=make_response(corridor.to_dict(), 200)
        return response
    
    def delete(self, id):
        corridor=Corridor.query.filter_by(id=id).first()
        if not corridor:
            return {'error': 'Corridor does not exist'}, 404
        db.session.delete(corridor)
        db.session.commit()
        
        response_body={'message':'Corridor deleted successfully'}
        response=make_response(response_body, 200)
        return response


#Rate model
class RateResource(Resource):
    def get(self):
        rates=[rate.to_dict() for rate in Rate.query.all()]
        response=make_response(rates, 200)
        return response
    
    def post(self):
        data=request.get_json()
        rate=Rate(
            rate=data.get('rate'),
            corridor_id=data.get('corridor_id')
        )
        db.session.add(rate)
        db.session.commit()

        response=make_response(rate.to_dict(), 201)
        return response

class RateById(Resource):
    def get(self, id):
        rate=Rate.query.filter_by(id=id).first()
        if not rate:
            return {'error': "Rate does not exist"}, 404
        response=make_response(rate.to_dict(), 200)
        return response
    
    def patch(self, id):
        rate=Rate.query.filter_by(id=id).first()
        if not rate:
            return {'error': 'Rate does not exist'}, 404
        
        data=request.get_json()
        if 'rate' in data:
            rate.rate=data.get('rate')
        if "corridor_id" in data:
            rate.corridor_id=data.get('corridor_id')

        db.session.commit()
        response=make_response(rate.to_dict(), 200)
        return response
    
    def delete(self, id):
        rate=Rate.query.filter_by(id=id).first()
        if not rate:
            return {'error': 'Rate does not exist'}, 404
        db.session.delete(rate)
        db.session.commit()
        
        response_body={'message':'Rate deleted successfully'}
        response=make_response(response_body, 200)
        return response


#Transaction model
class TransactionResource(Resource):
    def get(self):
        transactions=[transaction.to_dict() for transaction in Transaction.query.all()]
        response=make_response(transactions, 200)
        return response
    
    def post(self):
        data=request.get_json()
        transaction=Transaction(
            amount_sent=data.get('amount_sent'),
            amount_received=data.get('amount_received'),
            corridor_id=data.get('corridor_id')
        )
        db.session.add(transaction)
        db.session.commit()

        response=make_response(transaction.to_dict(), 201)
        return response

class TransactionById(Resource):
    def get(self, id):
        transaction=Transaction.query.filter_by(id=id).first()
        if not transaction:
            return {'error': "Transaction does not exist"}, 404
        response=make_response(transaction.to_dict(), 200)
        return response
    
    def patch(self, id):
        transaction=Transaction.query.filter_by(id=id).first()
        if not transaction:
            return {'error': 'Transaction does not exist'}, 404
        
        data=request.get_json()
        if 'amount_sent' in data:
            transaction.amount_sent=data.get('amount_sent')
        if "amount_received" in data:
            transaction.amount_received=data.get('amount_received')
        if 'corridor_id' in data:
            transaction.corridor_id=data.get('corridor_id')

        db.session.commit()
        response=make_response(transaction.to_dict(), 200)
        return response
    
    def delete(self, id):
        transaction=Transaction.query.filter_by(id=id).first()
        if not transaction:
            return {'error': 'Transaction does not exist'}, 404
        db.session.delete(transaction)
        db.session.commit()
        
        response_body={'message':'Transaction deleted successfully'}
        response=make_response(response_body, 200)
        return response
    


api.add_resource(Start, '/welcome')
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(UserResource, '/users')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(CountryResource, '/countries')
api.add_resource(CountryById, '/countries/<int:id>')
api.add_resource(CorridorResource, '/corridors')
api.add_resource(CorridorById, '/corridors/<int:id>')
api.add_resource(RateResource, '/rates')
api.add_resource(RateById, '/rates/<int:id>')
api.add_resource(TransactionResource, '/transactions')
api.add_resource(TransactionById, '/transactions/<int:id>')




if __name__=='__main__':
    app.run(port=5555, debug=True)

# kill -9 $(lsof -t -i:5555)