# Marc's Agent Web App

This application consists of a React frontend and Node.js backend with Spotify integration.

## Project Structure
```
./
├── frontend/     # React frontend application
├── backend/      # Node.js backend server
└── deploy/       # Deployment configurations
```

## Local Development

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Deployment

### Frontend (S3 + CloudFront)
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy using AWS CloudFormation:
   ```bash
   aws cloudformation deploy \
     --template-file deploy/frontend/s3-cloudfront.yml \
     --stack-name marcs-agent-frontend \
     --parameter-overrides DomainName=your-domain-name
   ```
3. Upload build files:
   ```bash
   aws s3 sync frontend/build/ s3://your-bucket-name/
   ```

### Backend (EC2)
1. Launch EC2 instance using Amazon Linux 2
2. Use the user-data script in deploy/backend/user-data.sh
3. Configure security group to allow inbound traffic on port 3001

## Environment Variables

### Frontend (.env.local)
```
REACT_APP_API_URL=http://your-backend-url:3001
REACT_APP_SPOTIFY_CLIENT_ID=your_client_id
```

### Backend (.env)
```
PORT=3001
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
FRONTEND_URL=http://your-frontend-url
```
