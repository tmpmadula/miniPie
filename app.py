from flask import Flask, request
from flask_cors import cross_origin

import requests
import json

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, Case, Vaccine

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:covid1234@localhost/covidInfo"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

base_api_url = "https://covid-api.mmediagroup.fr/v1/"


@app.route("/cases")
@cross_origin()
def get_cases():
    try:
        country_name = request.args.get('country')
        response = requests.get(f"{base_api_url}cases", params={
                                'country': country_name})
        data = response.json()
        data = data.get("All", {})
    except requests.HTTPError as e:
        print(e)

    try:
        case = Case(
            data.get("confirmed", 0),
            data.get("recovered", 0),
            data.get("deaths", 0),
            data.get("country", "")
        )
        db.session.add(case)
        db.session.commit()
        return data
    except Exception as e:
        print(e)


@app.route("/vaccines")
@cross_origin()
def get_vaccines():
    try:
        country_name = request.args.get('country')
        response = requests.get(f"{base_api_url}vaccines", params={
                                'country': country_name})
        data = response.json()
        data = data.get("All", {})
    except requests.HTTPError as e:
        print(e)

    try:
        vaccine = Vaccine(
            data.get("administered", 0),
            data.get("people_vaccinated", 0),
            data.get("people_partially_vaccinated", 0),
            data.get("country", "")
        )

        db.session.add(vaccine)
        db.session.commit()
        return data
    except Exception as e:
        print(e)


if __name__ == '__main__':
    app.run(debug=True)
