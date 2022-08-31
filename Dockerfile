FROM node:14 AS builder

WORKDIR /app

COPY package.json yarn.* tsconfig.json ./
COPY ./src ./src
COPY prisma ./prisma/

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:14

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder package.json yarn.* ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

RUN npx prisma generate
CMD [ "yarn", "start"]