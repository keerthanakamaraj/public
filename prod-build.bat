@echo off
REM Ng Build - Production Mode

ng build --prod

REM start server from dist directory using python ( requires python 3.x )
REM python -m http.server 1841 --directory dist\rlo-ui
