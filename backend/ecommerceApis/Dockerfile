#Draws from base image, slim is the minimum version, and bullseye is the debian release.
FROM python:3.8.10-slim-buster

#Set environmental variables
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

#Sets docker work directory
WORKDIR /code

#Copy requirements.txt from current directory, to docker /code directory
COPY ./requirements.txt .

RUN python3 -m pip install -r requirements.txt

#Copy current directory to docker /code
COPY . .
