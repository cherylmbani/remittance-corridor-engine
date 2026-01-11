from app import app, db
from models import User, Country, Transaction, Corridor, Rate
from datetime import datetime

def seed_database():
    with app.app_context():
        print("Clearing database...")
        User.query.delete()
        Country.query.delete()
        Corridor.query.delete()
        Rate.query.delete()
        Transaction.query.delete()
        
        print("Creating users...")
        users = [
            User(
                first_name="Cheryl",
                last_name="Mbani",
                email="cheryl@gmail.com",
                password="cheryl123",  # This will trigger the password setter
                created_at=datetime(2025, 1, 12)
            ),
            User(
                first_name="John",
                last_name="Smith",
                email="john.smith@example.com",
                password="john123",
                created_at=datetime(2025, 1, 15)
            ),
            User(
                first_name="Maria",
                last_name="Garcia",
                email="maria.garcia@example.com",
                password="maria123",
                created_at=datetime(2025, 1, 20)
            ),
            User(
                first_name="David",
                last_name="Chen",
                email="david.chen@example.com",
                password="david123",
                created_at=datetime(2025, 1, 25)
            ),
            User(
                first_name="Sarah",
                last_name="Johnson",
                email="sarah.j@example.com",
                password="sarah123",
                created_at=datetime(2025, 2, 1)
            )
        ]
        
        print("Creating countries...")
        countries = [
            Country(
                name="United States",
                code="US"
            ),
            Country(
                name="United Kingdom",
                code="UK"
            ),
            Country(
                name="Kenya",
                code="KE"
            ),
            Country(
                name="Nigeria",
                code="NG"
            ),
            Country(
                name="Germany",
                code="DE"
            )
        ]
        
        db.session.add_all(users)
        db.session.add_all(countries)
        db.session.commit()
        print("Users and countries committed to database.")
        
        # Create corridors after countries are committed (need country IDs)
        print("Creating corridors...")
        corridors = [
            Corridor(
                from_country=countries[0].id,  # US to UK
                to_country=countries[1].id
            ),
            Corridor(
                from_country=countries[1].id,  # UK to Kenya
                to_country=countries[2].id
            ),
            Corridor(
                from_country=countries[0].id,  # US to Nigeria
                to_country=countries[3].id
            ),
            Corridor(
                from_country=countries[1].id,  # UK to Germany
                to_country=countries[4].id
            ),
            Corridor(
                from_country=countries[3].id,  # Nigeria to Kenya
                to_country=countries[2].id
            )
        ]
        
        db.session.add_all(corridors)
        db.session.commit()
        print("Corridors committed to database.")
        
        # Create rates after corridors are committed
        print("Creating rates...")
        rates = [
            Rate(
                rate=0.85,  # 1 USD = 0.85 GBP
                corridor_id=corridors[0].id
            ),
            Rate(
                rate=130.5,  # 1 GBP = 130.5 KES
                corridor_id=corridors[1].id
            ),
            Rate(
                rate=750.0,  # 1 USD = 750 NGN
                corridor_id=corridors[2].id
            ),
            Rate(
                rate=1.15,  # 1 GBP = 1.15 EUR
                corridor_id=corridors[3].id
            ),
            Rate(
                rate=15.8,  # 1 NGN = 15.8 KES
                corridor_id=corridors[4].id
            )
        ]
        
        db.session.add_all(rates)
        db.session.commit()
        print("Rates committed to database.")
        
        # Create transactions
        print("Creating transactions...")
        transactions = [
            Transaction(
                amount_sent=1000.0,
                amount_received=850.0,  # 1000 USD to GBP
                transaction_date=datetime(2025, 2, 10, 14, 30, 0),
                corridor_id=corridors[0].id
            ),
            Transaction(
                amount_sent=500.0,
                amount_received=65250.0,  # 500 GBP to KES
                transaction_date=datetime(2025, 2, 12, 10, 15, 0),
                corridor_id=corridors[1].id
            ),
            Transaction(
                amount_sent=200.0,
                amount_received=150000.0,  # 200 USD to NGN
                transaction_date=datetime(2025, 2, 15, 16, 45, 0),
                corridor_id=corridors[2].id
            ),
            Transaction(
                amount_sent=1000.0,
                amount_received=1150.0,  # 1000 GBP to EUR
                transaction_date=datetime(2025, 2, 18, 9, 0, 0),
                corridor_id=corridors[3].id
            ),
            Transaction(
                amount_sent=50000.0,
                amount_received=790000.0,  # 50,000 NGN to KES
                transaction_date=datetime(2025, 2, 20, 11, 30, 0),
                corridor_id=corridors[4].id
            )
        ]
        
        db.session.add_all(transactions)
        db.session.commit()
        print("Transactions committed to database.")
        
        print("Database seeding completed successfully!")
        print(f"Created: {len(users)} users, {len(countries)} countries, {len(corridors)} corridors, {len(rates)} rates, {len(transactions)} transactions")

if __name__ == "__main__":
    seed_database()