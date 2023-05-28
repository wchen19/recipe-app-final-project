import pandas as pd
import numpy as np
import requests

from gensim.models import Word2Vec
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from ingredient_parser import ingredient_parser
from collections import defaultdict

def get_recommendations(N, scores):
    df_recipes = pd.read_csv('./assets/recipes_parsed.csv')
    top = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:N]
    recommendation = pd.DataFrame(columns=["recipe", "ingredients", "instruction", 'image_name', 'bookmarked', 'viewers', "score", "ingredients_parsed"])
    count = 0
    
    for i in top:
        recommendation.at[count, "id"] = df_recipes["id"][i]
        recommendation.at[count, "recipe"] = df_recipes["title"][i]
        recommendation.at[count, "ingredients"] = df_recipes["cleaned_ingredient"][i]
        recommendation.at[count, "ingredients_parsed"] = df_recipes["ingredients_parsed"][i]
        recommendation.at[count, "instruction"] = df_recipes["instruction"][i]
        recommendation.at[count, "image_name"] = df_recipes["image_name"][i]
        recommendation.at[count, "bookmarked"] = df_recipes["bookmarked"][i]
        recommendation.at[count, "viewers"] = df_recipes["viewers"][i]
        recommendation.at[count, "score"] = f"{scores[i]}" 
        count += 1
    return recommendation

def get_and_sort_corpus(data):
    corpus_sorted = []
    for doc in data.parsed.values:
        doc.sort()
        corpus_sorted.append(doc)
    return corpus_sorted

class TfidfEmbeddingVectorizer(object):
    def __init__(self, word_model):

        self.word_model = word_model
        self.word_idf_weight = None
        self.vector_size = word_model.wv.vector_size

    def fit(self, docs):  
        text_docs = []
        for doc in docs:
            text_docs.append(" ".join(doc))

        tfidf = TfidfVectorizer()
        tfidf.fit(text_docs)
        max_idf = max(tfidf.idf_)  
        self.word_idf_weight = defaultdict(
            lambda: max_idf,
            [(word, tfidf.idf_[i]) for word, i in tfidf.vocabulary_.items()],
        )
        return self

    def transform(self, docs):  
        doc_word_vector = self.word_average_list(docs)
        return doc_word_vector

    def word_average(self, sent):
        mean = []
        for word in sent:
            if word in self.word_model.wv.index_to_key:
                mean.append(
                    self.word_model.wv.get_vector(word) * self.word_idf_weight[word]
                )

        if not mean: 
            return np.zeros(self.vector_size)
        else:
            mean = np.array(mean).mean(axis=0)
            return mean

    def word_average_list(self, docs):
        return np.vstack([self.word_average(sent) for sent in docs])
    
def get_recs(ingredients, N=20):
    model = Word2Vec.load('./models/model_cbow.bin')
    model.wv.get_normed_vectors()
    if model:
        print("Successfully loaded model")
        
    response = requests.get('http://localhost:3000/recipe')
    if response.status_code == 200:
        data = response.json()
    else:
        print('Error retrieving dataset:', response.status_code)
    data = pd.DataFrame(data, columns=['id', 'title', 'ingredient', 'cleaned_ingredient', 'bookmarked', 'viewers'])

    # data = pd.read_csv('./assets/Food Recipe.csv')
    # data = data[:5000]
    data["parsed"] = data.cleaned_ingredient.apply(ingredient_parser)
    corpus = get_and_sort_corpus(data)

    tfidf_vec_tr = TfidfEmbeddingVectorizer(model)
    tfidf_vec_tr.fit(corpus)
    doc_vec = tfidf_vec_tr.transform(corpus)
    doc_vec = [doc.reshape(1, -1) for doc in doc_vec]
    assert len(doc_vec) == len(corpus)

    input = ingredients
    input = input.split(",")
    print(input)
    input = ingredient_parser(input)
    input_embedding = tfidf_vec_tr.transform([input])[0].reshape(1, -1)

    cos_sim = map(lambda x: cosine_similarity(input_embedding, x)[0][0], doc_vec)
    scores = list(cos_sim)
    recommendations = get_recommendations(N, scores)
    return recommendations

if __name__ == "__main__":
    # test ingredients
    test_ingredients = "pasta,tomato,cheese"
    recs = get_recs(test_ingredients, 20)
    print(recs)