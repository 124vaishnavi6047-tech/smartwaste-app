# SmartWaste AI - Deployment Guide

## Prerequisites
- Node.js v14+ and npm
- SQLite3 (or use better-sqlite3 which is bundled)
- A domain/server for hosting

## Deployment Steps

### 1. Frontend Deployment

#### Option A: Vercel, Netlify, or GitHub Pages
```bash
cd e:\smartwaste-ai

# Set production API URL in .env.production
REACT_APP_API_URL=https://your-backend-domain.com/api

# Build for production
npm run build

# The `build/` folder is ready to deploy
```

#### Option B: Traditional Server (Nginx/Apache)
```bash
# Build the React app
npm run build

# Copy the `build` folder contents to your web server's public directory
# Configure your web server to serve index.html for all routes (SPA routing)
```

### 2. Backend Deployment

#### Prerequisites
- Node.js runtime on your server
- SQLite database file

#### Steps
1. **Upload backend files** to your server:
   ```bash
   scp -r ./smartwaste-backend username@your-server.com:/var/www/smartwaste-backend
   ```

2. **Install dependencies**:
   ```bash
   cd /var/www/smartwaste-backend
   npm install --production
   ```

3. **Configure environment**:
   ```bash
   # Copy and edit .env.production
   cp .env.production .env
   
   # Edit .env with your actual values:
   # - Generate a strong JWT_SECRET
   # - Set FRONTEND_URL to your frontend domain
   # - Set NODE_ENV=production
   ```

4. **Database setup**:
   - Ensure `smartwaste.db` exists in the backend directory
   - Or configure `DB_PATH` in `.env` to point to your database location

5. **Run with PM2 (recommended)**:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "smartwaste-backend"
   pm2 startup
   pm2 save
   ```

6. **Configure reverse proxy (Nginx example)**:
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
   }
   ```

### 3. Environment Variables Checklist

**Backend (.env)**
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Set to "production"
- `JWT_SECRET` - Strong random secret (minimum 32 characters)
- `FRONTEND_URL` - Your frontend domain

**Frontend (.env.production)**
- `REACT_APP_API_URL` - Your backend API URL

### 4. SSL/HTTPS Setup

Use Let's Encrypt with Certbot:
```bash
sudo certbot certonly --standalone -d api.yourdomain.com
sudo certbot certonly --standalone -d yourdomain.com
```

### 5. Database Backup

Regularly backup your SQLite database:
```bash
# Create backup
cp smartwaste.db smartwaste.db.backup.$(date +%Y%m%d)

# Or use cron for automated backups:
# 0 2 * * * cp /var/www/smartwaste-backend/smartwaste.db /backups/smartwaste.db.$(date +\%Y\%m\%d)
```

### 6. Monitoring & Maintenance

- Monitor logs: `pm2 logs smartwaste-backend`
- Watch memory usage: `pm2 monit`
- Check server health: Monitor the `/` endpoint

### 7. Production Checklist

- [ ] JWT_SECRET is strong and unique
- [ ] FRONTEND_URL matches your frontend domain
- [ ] REACT_APP_API_URL points to your backend
- [ ] HTTPS/SSL is enabled
- [ ] CORS is properly configured
- [ ] Database backups are scheduled
- [ ] Node process manager (PM2) is configured
- [ ] Firewall allows ports 3000 (frontend) and 5000 (backend)
- [ ] Environment variables are set correctly
- [ ] Database migrations are run (if any)

## Troubleshooting

### API Connection Issues
- Check CORS settings in `.env` (FRONTEND_URL must match)
- Verify backend is running: `pm2 logs smartwaste-backend`
- Check network connectivity and firewall rules

### Database Issues
- Verify database permissions: `ls -l smartwaste.db`
- Check database path in `.env` (DB_PATH)
- Ensure database file is writable

### SSL/HTTPS Issues
- Check certificate expiry: `certbot certificates`
- Renew certificates: `certbot renew`

## Rolling Back

Keep previous versions available:
```bash
# Before deploying new version
cp -r /var/www/smartwaste-backend /var/www/smartwaste-backend.backup

# To rollback
pm2 stop smartwaste-backend
rm -rf /var/www/smartwaste-backend
mv /var/www/smartwaste-backend.backup /var/www/smartwaste-backend
npm install --production
pm2 start smartwaste-backend
```
