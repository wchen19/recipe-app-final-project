import pandas as pd 

from gensim.models import Word2Vec

from ingredient_parser import ingredient_parser

data = pd.read_csv('./assets/recipes_parsed.csv')
data['new_parsed'] = data.cleaned_ingredient.apply(ingredient_parser)

def get_and_sort_corpus(data):
    corpus_sorted = []
    for doc in data.new_parsed.values:
        doc.sort()
        corpus_sorted.append(doc)
    return corpus_sorted

corpus = get_and_sort_corpus(data)

lengths = [len(doc) for doc in corpus]
avg_len = float(sum(lengths)) / len(lengths)

sg = 0 # CBOW: build a language model that correctly predicts the center word given the context words in which the center word appears
workers = 8 # number of CPUs
window = avg_len # window size: average length of each document 
min_count = 10 # unique ingredients are important to decide recipes 
vector_size = 350 # dimensionality of the word vectors produced by the model
negative = 20 # number of negative samples to use for each positive sample during training

model_cbow = Word2Vec(corpus, sg=sg, workers=workers, window=window, min_count=min_count, vector_size=vector_size, negative=negative)

print(model_cbow)

words = list(model_cbow.wv.index_to_key)
words.sort()
# print(words)

# print(model_cbow.wv['chicken stock'])
print(model_cbow.wv.most_similar('chicken'))
# model_cbow.wv.similarity('chicken', 'carrot')

model_cbow.save('./models/model_cbow.bin')