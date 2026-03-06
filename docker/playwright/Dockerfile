# Версия OC
FROM --platform=linux/amd64 mcr.microsoft.com/playwright:v1.56.0-jammy

RUN apt-get update && \
    apt-get install -y default-jdk && \
    apt-get clean

RUN npm install -g @types/node && \
    npm install -g allure-commandline
    
# Устанавливаем Chrome на amd64
RUN npx playwright install chromium --with-deps

WORKDIR /usr/src/app