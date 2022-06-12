from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Case(db.Model):
    __tablename__ = 'case'

    id = db.Column(db.Integer, primary_key=True)
    confirmed = db.Column(db.Integer())
    recovered = db.Column(db.Integer())
    deaths = db.Column(db.Integer())
    country = db.Column(db.String())

    def __init__(self, confirmed, recovered, deaths, country):
        self.confirmed = confirmed
        self.recovered = recovered
        self.deaths = deaths
        self.country = country

    def __repr__(self):
        return f"{self.confirmed}:{self.recovered}:{self.deaths}:{self.country}"


class Vaccine(db.Model):
    __tablename__ = 'vaccine'

    id = db.Column(db.Integer, primary_key=True)
    administered = db.Column(db.Integer())
    people_vaccinated = db.Column(db.Integer())
    people_partially_vaccinated = db.Column(db.Integer())
    country = db.Column(db.String())

    def __init__(self, administered, people_vaccinated, people_partially_vaccinated, country):
        self.administered = administered
        self.people_vaccinated = people_vaccinated
        self.people_partially_vaccinated = people_partially_vaccinated
        self.country = country

    def __repr__(self):
        return f"{self.administered}:{self.people_vaccinated}:{self.people_partially_vaccinated}:{self.country}"
