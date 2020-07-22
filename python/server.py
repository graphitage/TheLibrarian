import os
import io
from flask import Flask, request, jsonify
from flask_cors import CORS
import random
from tika import parser
import json


paper_jsons = []


def get_paper_jsons():
    global paper_jsons
    papers_directory = 'papers'
    for paper in os.listdir(papers_directory):
        paper_path = os.path.join(papers_directory, paper)
        with open(paper_path, "rb") as json_file:
            data = json.load(json_file)
            paper_jsons.append(data)


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


def update_similarities(title):
    # for the paper with title, adds the similarity values with the
    # papers that are already in the papers list
    global paper_similarity

    # first create a new dictionary for the second dimension
    paper_similarity[title] = {}

    for paper in papers:
        if paper != title:
            # let's make it between 0.1 and 0.95
            similarity = random.random() * 0.85 + 0.1

            paper_similarity[title][paper] = similarity
            paper_similarity[paper][title] = similarity


def getPaperContents():
    # gets the paper from the directory where the paper files reside
    # for the newly added paper, calculates the similarity with all the
    # previous ones
    global papers, paper_content
    paper_directory = 'papers'
    paper_files = os.listdir(paper_directory)
    for paper_file in paper_files:
        file_path = os.path.join(paper_directory, paper_file)
        title = '.'.join(paper_file.split('.')[:-1])
        with open(file_path, 'rb') as paper_file:
            paper_content[title] = paper_file.read().decode().split('\n')
        update_similarities(title)
        papers.append(title)


# def isSectionTitle(content, index):
#     return (content[index][0].isnumeric() or
#         (index < (len(content) - 1) and content[index][0].isupper() and content[index+1][0].isupper()))


# def sanitizeContent(content):
#     result = []
#     for line in content:

#     return []


# def sanitizePaperContents():
#     global paper_content
#     for paper in paper_content:
#         content = paper_content[paper]
#         paper_content[paper] = sanitizeContent(content)


@app.route('/')
def papernodes():
    return jsonify(papers)


@app.route('/paper_upload', methods=['POST'])
def paper_upload():
    buf = io.BytesIO(request.files['paper'].read())
    buf.seek(0)
    raw = parser.from_buffer(buf)
    content = raw['content'].split('\n')
    content = [row for row in content if row != ""]

    return jsonify(content)


@app.route('/extract_text', methods=['POST'])
def extract_text():
    return jsonify(['done'])


@app.route('/paper_node/<int:id>', methods=['GET', 'POST'])
def send_paper_nodes(id):
    for paper_json in paper_jsons:
        if str(paper_json['Paper']['id']) == str(id):
            return jsonify(paper_json)
    return jsonify("empty")


if __name__ == '__main__':
    get_paper_jsons()
    getPaperContents()
    app.run(host='127.0.0.1', port=8000, debug=True)
