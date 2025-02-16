FROM node:22

WORKDIR /usr/src/app

COPY app/package*.json ./

RUN npm install

COPY ./app/ .

EXPOSE 5173

CMD ["bash"]