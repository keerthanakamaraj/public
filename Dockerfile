FROM nginx:alpine

COPY dist/rlo-ui /usr/share/nginx/html/rlo/
