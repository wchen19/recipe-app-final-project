from flask import Flask, jsonify, request, render_template
from flask_jsonpify import jsonpify
import json, requests, pickle
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity  
from ingredient_parser import ingredient_parser
import rec_sys

app = Flask(__name__)

@app.route('/', methods=["GET"])
def hello():
    return HELLO_HTML

HELLO_HTML = """
     <html><body>
         <h2>Click <a href="/recipe?ingredients=pasta,tomato,cheese">here</a> for an example when using the ingredients: pasta, tomato and cheese.</h2>
     </body></html>
     """

@app.route('/recipe', methods=["GET"])
def recommend_recipe():
    ingredients = request.args.get('ingredients')   
    print(ingredients)
    recipe = rec_sys.get_recs(ingredients, 20)
    
    response = {}
    count = 0
    for index, row in recipe.iterrows():
        response[count] = {
            'id': int(row['id']),
            'recipe': str(row['recipe']),
            'ingredients': str(row['ingredients']),
            'instruction': str(row['instruction']),
            'image_name': str(row['image_name']),
            'bookmarked': str(row['bookmarked']),
            'viewers': str(row['viewers']),
            'score': str(row['score']),
        }
        count += 1
    return jsonify(response)
   

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)



# http://127.0.0.1:5000/recipe?ingredients=pasta

# use ipconfig getifaddr en0 in terminal (ipconfig if you are on windows, ip a if on linux) 
# to find intenal (LAN) IP address. Then on any devide on network you can use server.