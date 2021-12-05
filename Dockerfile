FROM nginx
RUN mkdir /app
COPY ./dist /app