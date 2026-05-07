FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
COPY backend/package.json ./backend/package.json
RUN npm install
COPY backend ./backend
WORKDIR /app/backend
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/backend/dist ./backend/dist
COPY --from=build /app/backend/package.json ./backend/package.json
EXPOSE 4000
CMD ["node", "backend/dist/app.js"]
