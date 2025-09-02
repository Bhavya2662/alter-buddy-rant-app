# Rant App - Vercel Deployment Guide

## Overview
This guide will help you deploy the Rant App to Vercel with proper configuration for production use.

## Prerequisites
- Vercel account
- GitHub repository with the rant app code
- Railway API deployed and running

## Step 1: Prepare for Deployment

### 1.1 Environment Variables Setup
The following environment variables need to be configured in Vercel:

```bash
# API Configuration
REACT_APP_BACKEND_URL=https://alter-buddy-api-production.up.railway.app/api/1.0
REACT_APP_SOCKET_SERVER=https://alter-buddy-api-production.up.railway.app

# Build Configuration
NODE_OPTIONS=--max_old_space_size=4096

# Third-party Services
REACT_APP_ABLY_KEY=Fiv44w.ZkTEwA:O54qqKgcU-2KJh6IsbmDVAgf7pi7hNeWl5t72PVnOZI
REACT_APP_ABLY_API=Fiv44w.ZkTEwA:O54qqKgcU-2KJh6IsbmDVAgf7pi7hNeWl5t72PVnOZI
REACT_APP_GET_STREAM_KEY=n9y75xde4yk4
REACT_APP_GET_STREAM_SECRET=2u4etpbwhrgb8kmffgt879pgknmdndzxs82hptqtxndt39ku3shc6yavpup2us8e

# Environment
REACT_APP_ENVIRONMENT=production
```

### 1.2 Build Settings
- **Framework Preset**: Create React App
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

## Step 2: Deploy to Vercel

### 2.1 Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your rant app repository from GitHub
4. Select the rant app directory if it's in a monorepo

### 2.2 Configure Build Settings
1. Set Framework Preset to "Create React App"
2. Set Build Command to `npm run build`
3. Set Output Directory to `build`
4. Set Install Command to `npm install`

### 2.3 Add Environment Variables
1. Go to Project Settings → Environment Variables
2. Add all the environment variables listed in Step 1.1
3. Make sure to set them for Production, Preview, and Development environments

### 2.4 Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. Verify the deployment URL

## Step 3: Post-Deployment Configuration

### 3.1 Update Railway CORS Settings
Add your Vercel domain to the Railway API CORS configuration:
```bash
# Add to Railway environment variables
CORS_ORIGIN=https://your-rant-app.vercel.app,http://localhost:3001
```

### 3.2 Test the Deployment
1. Visit your Vercel deployment URL
2. Test rant functionality
3. Verify API connections
4. Check browser console for errors

## Step 4: Troubleshooting

### 4.1 Common Issues

**Blank Page**
- Check if all environment variables are set correctly
- Verify the `homepage: "."` setting in package.json
- Check browser console for JavaScript errors

**API Connection Issues**
- Verify Railway API is running
- Check CORS settings on Railway
- Ensure environment variables match Railway deployment

**Build Failures**
- Check for TypeScript errors
- Verify all dependencies are properly installed
- Review build logs in Vercel dashboard

### 4.2 Environment Variable Checklist
- [ ] REACT_APP_BACKEND_URL
- [ ] REACT_APP_SOCKET_SERVER
- [ ] REACT_APP_ABLY_KEY
- [ ] REACT_APP_ABLY_API
- [ ] REACT_APP_GET_STREAM_KEY
- [ ] REACT_APP_GET_STREAM_SECRET
- [ ] REACT_APP_ENVIRONMENT
- [ ] NODE_OPTIONS

## Step 5: Automatic Deployments

Vercel will automatically deploy when you push to your main branch. To configure:

1. Go to Project Settings → Git
2. Configure production branch (usually `main` or `master`)
3. Set up preview deployments for other branches

## Next Steps

1. Set up custom domain (optional)
2. Configure analytics and monitoring
3. Set up staging environment
4. Implement CI/CD workflows

## Support

If you encounter issues:
1. Check Vercel build logs
2. Review browser console errors
3. Verify Railway API status
4. Check environment variable configuration