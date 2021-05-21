FROM node:14-alpine

# Create directories
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Set working directory to app folder, and switch to node user
WORKDIR /home/node/app
USER node

# You MUST build assets first, before building this dockerfile
# Copy parent directory resources to app folder, and install node dependencies
COPY --chown=node:node build/prod/api .
COPY --chown=node:node package.json .
RUN npm install -only=production

ENTRYPOINT ["node", "app.js"]
