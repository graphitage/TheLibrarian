# The Librarian

[Watch the demo video here.](https://www.youtube.com/watch?v=dB-KBpiRqVA&feature=youtu.be)

The Librarian is meant to be used for getting a value out of big chunks of document data. It is a platform to make conceptually creating relations among documents, comparing and creating semantic groups out of them possible. Its aim is to solve the common problem of grouping document data. The users can contribute to the amount of data by adding new documents, which will then get positioned in the data space according to their similarities with the already existing ones.

The Librarian uses **OCR** to extract the textual content out of document files. Supported file formats are `.pdf`, `.docx`, and common image files like `.jpg`, `.pdf`. It relies on
* [`Apache Tika`](https://pypi.org/project/tika/) for .pdf files,
* [`python-docx`](https://pypi.org/project/python-docx-1/) library for .docx files,
* and [`Tesseract`](https://pypi.org/project/pytesseract/) for image files.

**Topic modeling** is used to get the similarity score between multiple papers according to what topic their contents are about. For this, the [`RESTful-Top2Vec`](https://github.com/ddangelov/Top2Vec) algorithm is used.