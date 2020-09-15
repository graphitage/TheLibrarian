# set base image (host OS)
FROM python:3.7

# copy the dependencies file to the working directory
COPY . ./

# install dependencies
RUN pip install umap-learn \
	pip install Flask \
	pip install Flask-Cors \
	pip install tika \
	pip install top2vec \
	pip install waitress

# Make port 8000 available for the app
EXPOSE 8000

# command to run on container start
CMD [ "python", "./server.py"]




