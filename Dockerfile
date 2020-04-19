FROM nginx:alpine

COPY dist/rlo-ui /usr/share/nginx/html/rlo/
RUN chown -R ngnix /usr/share/nginx/html/
