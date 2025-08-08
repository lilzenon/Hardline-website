# specify node.js image
FROM node:22-alpine

# use production node environment by default
ENV NODE_ENV=production

# set working directory.
WORKDIR /kutt

# download ALL dependencies first (including dev dependencies for build)
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

RUN mkdir -p /var/lib/kutt

# copy the rest of source files into the image
COPY . .

# build the frontend (requires dev dependencies)
RUN npm run build

# remove dev dependencies after build to reduce image size
RUN npm prune --omit=dev

# expose the port that the app listens on
EXPOSE 3000

# intialize database and run the app
CMD npm run migrate && npm start