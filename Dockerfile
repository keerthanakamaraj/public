FROM nginx:alpine

COPY dist/rlo-ui /usr/share/nginx/html/rlo/
RUN ln -s /usr/share/nginx/html/ /usr/share/nginx/html/dev && ln -s /usr/share/nginx/html/ /usr/share/nginx/html/sandbox5 && chmod -R 755 /usr/share/nginx/html/
