import os
import io
from flask import Flask, request, jsonify
from flask_cors import CORS
import random
from tika import parser
import json
from top2vec import Top2Vec
from paper_cluster import get_positions_from_similarities


paper_directory = 'papers'


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

# model.documents --> content
# model.document_ids --> title

model = Top2Vec.load('model.thelibrarian')

for title in model.document_ids:
    paper_similarity[title] = {}
    doc_scores, doc_ids = model.search_documents_by_documents(
        doc_ids=[title],
        num_docs=len(model.documents)-1,
        return_documents=False)
    for score, doc_id in zip(doc_scores, doc_ids):
        paper_similarity[title][doc_id] = score

app = Flask(__name__)
CORS(app)

paper_positions = None


def getPapersAndSimilarities():
    global papers, paper_content, paper_similarity
    papers = list(model.document_ids)
    
    paper_files = os.listdir(paper_directory)
    for paper_file in paper_files:
        title = '.'.join(paper_file.split('.')[:-1])
        
        file_path = os.path.join(paper_directory, paper_file)
        with open(file_path, 'rb') as file:
            content = file.read().decode()
        
        paper_content[title] = content

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


def extract_text_from_buffer(buffer, exclude_commons=False):
    buffer.seek(0)
    raw = parser.from_buffer(buffer)
    content = raw['content'].split('\n')
    content = [row for row in content if row != ""]

    if not exclude_commons:
        return content

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


@app.route('/submit_paper', methods=['POST'])
def submit_paper():
    buf = io.BytesIO(request.files['paper'].read())
    extracted_text = '\n'.join(extract_text_from_buffer(buf))
    extracted_text_without_common_words = '\n'.join(
        extract_text_from_buffer(buf, exclude_commons=True))

    filename = request.form['title']
    with open(os.path.join(paper_directory, (filename + '.txt')), 'wb') as file:
        file.write(extracted_text.encode())
    if filename not in model.document_ids:
        model.add_documents(
            documents=[extracted_text_without_common_words], document_ids=[filename])
        doc_scores, doc_ids = model.search_documents_by_documents(
            doc_ids=[filename],
            num_docs=len(model.documents)-1,
            return_documents=False)
        for score, doc_id in zip(doc_scores, doc_ids):
            paper_similarity[filename][doc_id] = score
            paper_similarity[doc_id][filename] = score

    return jsonify(message='Your paper contribution (' + filename + ') is saved. Thanks!')


@app.route('/graph_nodes', methods=['GET'])
def graph_nodes():
    global paper_positions
    result = []
    for paper in paper_positions:
        x = paper_positions[paper][0]
        y = paper_positions[paper][1]
        result.append(
            {'data': {'id': paper}, 'position': {'x': x, 'y': y} }
        )
    return jsonify(result)


@app.route('/paper_similarity/<string:title1>/<string:title2>', methods=['GET'])
def send_paper_similarity(title1, title2):
    try:
        return jsonify(
            {'similarity': paper_similarity[title1][title2]}
        )
    except:
        return jsonify('empty')


@app.route('/paper_node/<string:title1>', methods=['GET'])
def paper_node(title1):
    return jsonify(
        {'content': paper_content[title1]}
    )


paper_positions = get_positions_from_similarities(paper_similarity)


if __name__ == '__main__':
    getPapersAndSimilarities()
    app.run(host='127.0.0.1', port=8000, debug=True)
