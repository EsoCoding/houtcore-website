# Houtcore Frontend Deployment Guide

This guide covers deploying the Next.js frontend with proper styling and colors.

## The Color Issue

If colors aren't showing correctly on the other server, it's likely because:

1. **CSS files aren't being built/served properly**
2. **Tailwind CSS isn't processing the custom colors**
3. **Environment variables are missing**
4. **Build process is incomplete**

## Frontend Deployment Steps

### 1. Install Dependencies

```bash
cd houtcore-website  # Root directory
npm install
# or
pnpm install
```

### 2. Build the Application

```bash
npm run build
# or
pnpm build
```

### 3. Environment Variables

Create `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=http://your-server:8000/api
```

### 4. Start Production Server

```bash
npm start
# or
pnpm start
```

## Troubleshooting Color Issues

### Check 1: Tailwind CSS Configuration

Verify your `tailwind.config.ts` includes the custom Houtcore colors:

```typescript
colors: {
  "houtcore-gold": "#EEB457",
  "houtcore-brown": "#B89960", 
  "houtcore-charcoal": "#2d3134",
}
```

### Check 2: CSS Import

Verify `app/layout.tsx` imports the global CSS:

```typescript
import "./globals.css"
```

### Check 3: Build Output

Check if CSS is being generated:
```bash
ls -la .next/static/css/
```

### Check 4: Network Issues

In browser dev tools, check if CSS files are loading:
- Open Developer Tools → Network tab
- Look for failed CSS requests (red entries)

## Common Solutions

### Solution 1: Clear Build Cache
```bash
rm -rf .next
npm run build
```

### Solution 2: Verify CSS Processing
```bash
# Check if Tailwind is processing correctly
npx tailwindcss -i ./app/globals.css -o ./test-output.css --watch
```

### Solution 3: Check PostCSS Configuration
Verify `postcss.config.mjs`:
```javascript
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
export default config
```

### Solution 4: Force Tailwind to Include Colors
Add to `tailwind.config.ts` safelist:
```typescript
safelist: [
  'bg-houtcore-gold',
  'text-houtcore-gold', 
  'bg-houtcore-brown',
  'bg-houtcore-charcoal',
  // Add other custom classes being used
]
```

## Production Deployment

### Option 1: Node.js Server
```bash
npm run build
npm start
```

### Option 2: Static Export (if no server-side features needed)
```bash
# Add to next.config.mjs:
# output: 'export'

npm run build
# Deploy the 'out' folder to any static hosting
```

### Option 3: PM2 (Process Manager)
```bash
npm install -g pm2
pm2 start npm --name "houtcore-frontend" -- start
pm2 save
pm2 startup
```

## Environment-Specific Issues

### Development vs Production
- Colors work in development but not production → Build issue
- Check if `NODE_ENV=production` is set correctly

### Server Configuration
- If using nginx/Apache, ensure static files are served correctly
- Configure proper MIME types for CSS files

## Debugging Commands

```bash
# Check build output
npm run build 2>&1 | grep -i error

# Check if custom colors are in built CSS
grep -r "houtcore-gold" .next/static/css/

# Test Tailwind config
npx tailwindcss --init --dry-run

# Check PostCSS processing
npx postcss app/globals.css -o test.css
```

## Quick Fix Script

Create `fix-colors.sh`:
```bash
#!/bin/bash
echo "🎨 Fixing color issues..."
rm -rf .next
rm -rf node_modules/.cache
npm install
npm run build
echo "✅ Build complete - test your colors!"
```

## Verification

After deployment, verify colors by:
1. Opening the website in browser
2. Checking Developer Tools → Elements
3. Looking for classes like `bg-houtcore-charcoal`, `text-houtcore-gold`
4. Verifying CSS values: `#2d3134`, `#EEB457`, `#B89960`

If colors still don't work, share:
- Browser console errors
- Network tab showing failed requests  
- Built CSS file content (from .next/static/css/)
