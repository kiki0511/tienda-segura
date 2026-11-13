FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
# Reto 2: Trivy avisa que la imagen corre como root. Se corrige con un usuario sin privilegios.
USER node
EXPOSE 3000
CMD ["node", "app.js"]
