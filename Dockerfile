FROM nginx:alpine

COPY dist/rlo-ui /usr/share/nginx/html/rlo/
RUN chmod -R 755 /usr/share/nginx/html/
