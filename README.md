# The Librarian
![The Librarian Logo](TheLibrarian.png)

[Watch the demo video here.](https://youtu.be/rgw5jyq0Xz0)

The Librarian is meant to be used for getting a value out of big chunks of document data. It is a platform to make conceptually creating relations among documents, comparing and creating semantic groups out of them possible. Its aim is to solve the common problem of grouping document data. The users can contribute to the amount of data by adding new documents, which will then get positioned in the data space according to their similarities with the already existing ones.

The Librarian uses **OCR** to extract the textual content out of document files. Supported file formats are `.pdf`, `.docx`, and common image files like `.jpg`, `.pdf`. It relies on
* [`Apache Tika`](https://pypi.org/project/tika/) for .pdf files,
* [`python-docx`](https://pypi.org/project/python-docx-1/) library for .docx files,
* and [`Tesseract`](https://pypi.org/project/pytesseract/) for image files.

**Topic modeling** is used to get the similarity score between multiple papers according to what topic their contents are about. For this, the [`Top2Vec`](https://github.com/ddangelov/Top2Vec) algorithm is used.

### How to run
* For the application to work, the python back-end needs to be already running. First of all you need to install this python libraries.
  *  umap-learn
	*  Flask
	*  Flask-Cors
	*  tika
	*  top2vec
	*  waitress

* After the installation, run following commands on a terminal.
  ```
  cd python
  python server.py
  ```

* To run the application itself, type the following ([node.js](https://nodejs.org/) needs to be installed first).
  ```
  npm run
  ```

* You may need to first
  ```
  npm install
  ```
  to get the dependencies.
  
### How to run with Docker
Firstly, download [Docker desktop](https://www.docker.com/products/docker-desktop) and follow its
 instructions to install it. This allows us to start using Docker containers.
 
Create a local copy of this repository, open a terminal in root of repository and run

    docker-compose build
	
This spins up Compose and builds a local development environment according to 
our specifications in [docker-compose.yml](docker-compose.yml).

After the containers have been built (this may take a few minutes), run

    docker-compose up
    
This one command boots up a local server for Flask (on port 8000)
and React (on port 3000). Head over to

    http://localhost:3000/ 
    
to view an TheLibrarian main page.
This data was retrieved through an API call to our Flask server,
which can be accessed at

    http://localhost:8000/
    
Finally, to gracefully stop running our local servers, you can run
 
    docker-compose down

in a separate terminal window or press __control + C__.
