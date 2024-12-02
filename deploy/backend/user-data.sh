#!/bin/bash
yum update -y
yum install -y nodejs npm git

# Install PM2 globally
npm install -y pm2 -g

# Clone the repository
git clone https://github.com/marcplotkin/marcs-agent.git /home/ec2-user/app

# Setup backend
cd /home/ec2-user/app/backend
npm install

# Create env file
cat << EOF > .env
PORT=3001
SPOTIFY_CLIENT_ID=${SPOTIFY_CLIENT_ID}
SPOTIFY_CLIENT_SECRET=${SPOTIFY_CLIENT_SECRET}
FRONTEND_URL=${FRONTEND_URL}
EOF

# Start the application with PM2
pm2 start src/server.js
pm2 startup
pm2 save
