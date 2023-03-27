import pandas as pd
import numpy as np
import string
import ast
import re
import requests
import unidecode

from nltk.stem import WordNetLemmatizer

def ingredient_parser(ingreds):
    
    measures = np.loadtxt('./assets/measures.txt', dtype=str, delimiter=', ', comments=None)
    words_to_remove = np.loadtxt('./assets/words_to_remove.txt', dtype=str, delimiter=', ', comments=None)
    
    if isinstance(ingreds, list):
        ingredients = ingreds
    else:
        ingredients = ast.literal_eval(ingreds)
        
    translator = str.maketrans("", "", string.punctuation)
    lemmatizer = WordNetLemmatizer()
    ingred_list = []
    
    for i in ingredients:
        i.translate(translator) 
        items = re.split(" |-", i)
        items = [word for word in items if word.isalpha()]
        items = [word.lower() for word in items]
        items = [
            unidecode.unidecode(word) for word in items
        ]  
        items = [lemmatizer.lemmatize(word) for word in items]
        items = [word for word in items if word not in measures]
        items = [word for word in items if word not in words_to_remove]
        items = ' '.join(dict.fromkeys(items))
        if items:
            ingred_list.append(items)
    return ingred_list
   
if __name__ == "__main__":
    response = requests.get('http://localhost:3000/recipe')
    if response.status_code == 200:
        data = response.json()
    else:
        print('Error retrieving dataset:', response.status_code)
    recipe_df = pd.DataFrame(data, columns=['id', 'title', 'ingredient', 'instruction', 'cleaned_ingredient', 'image_name', 'bookmarked', 'viewers'])
    # recipe_df = pd.read_csv('./assets/Food Recipe.csv')
    # recipe_df = recipe_df[:5000]
    recipe_df["ingredients_parsed"] = recipe_df["cleaned_ingredient"].apply(
        lambda x: ingredient_parser(x)
    )
    df = recipe_df[['id',"title", "ingredients_parsed", "cleaned_ingredient", "instruction", 'image_name', 'bookmarked', 'viewers']]
    df = recipe_df.dropna()
    df.to_csv('./assets/recipes_parsed.csv', index=False)
    