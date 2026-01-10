from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.orm import validates, relationship
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

db=SQLAlchemy()
migrate=Migrate()

class Country(db.Model, SerializerMixin):
    __tablename__="countries"
    serialize_rules=('-corridors.country', )

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, unique=True)
    code=db.Column(db.String, unique=True)

    corridors=db.relationship('Corridor', back_populates='country')
    
    corridor_ids=association_proxy('corridors', 'id')

    def __repr__(self):
        return f"<Country: {self.id} {self.name}>"
    
    
class Corridor(db.Model, SerializerMixin):
    __tablename__="corridors"
    serialize_rules=('-country.corridors', '-rates.corridor', '-transactions.corridor')
    
    id=db.Column(db.Integer, primary_key=True)
    from_country=db.Column(db.Integer, db.ForeignKey('countries.id'))
    to_country=db.Column(db.Integer, db.ForeignKey('countries.id'))
    country_id=db.Column(db.Integer, db.ForeignKey('countries.id'))

    country=db.relationship('Country', back_populates="corridors")
    rates=db.relationship('Rate', back_populates='corridor')
    transactions=db.relationship('Transaction', back_populates="corridor")

    rates_ids=association_proxy('rates', id)
    transactions_ids=association_proxy('transactions', 'id')

    def __repr__(self):
        return f"<Corridor: {self.id}>"
    

class Rate(db.Model, SerializerMixin):
    __tablename__="rates"
    serialize_rules=('-corridor.rates', )

    id=db.Column(db.Integer, primary_key=True)
    rate=db.Column(db.Float, nullable=False)
    corridor_id=db.Column(db.Integer, db.ForeignKey('corridors.id'))

    corridor=db.relationship('Corridor', back_populates='rates')

    def __repr__(self):
        return f"<Rate: {self.id} {self.rate}>"
    

class Transaction(db.Model, SerializerMixin):
    __tablename__="transactions"
    serialize_rules=('-corridor.transactions', )

    id=db.Column(db.Integer, primary_key=True)
    amount_sent=db.Column(db.Float, nullable=False)
    amount_received=db.Column(db.Float, nullable=False)
    transaction_date=db.Column(db.DateTime, default=datetime.utcnow)
    corridor_id=db.Column(db.Integer, db.ForeignKey('corridors.id'))
    corridor=db.relationship('Corridor', back_populates="transactions")

    def __repr__(self):
        return f"<Transaction: {self.id} {self.transaction_date}>"
    


