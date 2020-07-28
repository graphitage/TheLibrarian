import os
import io
from flask import Flask, request, jsonify
from flask_cors import CORS
import random
from tika import parser
import json
from top2vec import Top2Vec


common_words_file = open('common_words.txt', 'r')
lines = common_words_file.read().split('\n')
# dictionary for fast access
common_words = {}
for line in lines:
    common_words[line] = line
common_words_file.close()


# directory structure:
# - server.py
# -[papers]
#   // the filename will be the title of the paper ( + '.txt')
#   - paper1
#   - paper2
#   - ...

# a list of titles
# ["paperTitle1", "paperTitle2", ...]
papers = []

# a dictionary whose keys are paper titles
# {
#   "paperTitle1": "paperContent1",
#   "paperTitle2": "paperContent2",
#   ...
# }
paper_content = {}

# a two dimensional dictionary
# paper_similarity["paperTitle1"]["paperTitle2"] gives the similarity
# between two papers
paper_similarity = {}

app = Flask(__name__)
CORS(app)


model = Top2Vec.load('model.thelibrarian')


def getPapersAndSimilarities():
    global papers, paper_content, paper_similarity
    papers = list(model.document_ids)
    paper_content = list(model.documents)

    model_paper_count = len(model.documents)
    for paper_title in papers:
        paper_similarity[paper_title] = {}
        doc_scores, doc_ids =\
            model.search_documents_by_documents(
                doc_ids=[paper_title],
                num_docs=model_paper_count-1,
                return_documents=False
            )
        for doc_score, doc_id in zip(doc_scores, doc_ids):
            paper_similarity[paper_title][doc_id] = doc_score


@app.route('/')
def papernodes():
    return jsonify(papers)


def extract_text_from_buffer(buffer):
    buffer.seek(0)
    raw = parser.from_buffer(buffer)
    content = raw['content'].split('\n')
    content = [row for row in content if row != ""]

    result = []
    for line in content:
        words = line.split(' ')
        uncommon_words = []
        for word in words:
            if not ((word in common_words)
                or (word[-1:] == 's' and word[:-1] in common_words)
                or (word[-2:] == 'es' and word[:-2] in common_words)
                or (word[-3:] == 'ies' and word[:-3] in common_words)):
                uncommon_words.append(word)
        result.append(' '.join(uncommon_words))
    
    return result

@app.route('/extract_text', methods=['POST'])
def send_extracted_text():
    buf = io.BytesIO(request.files['paper'].read())
    extracted_text = extract_text_from_buffer(buf)

    return jsonify(extracted_text)


if __name__ == '__main__':
    # get_paper_jsons()
    getPapersAndSimilarities()
    app.run(host='127.0.0.1', port=8000, debug=True)
