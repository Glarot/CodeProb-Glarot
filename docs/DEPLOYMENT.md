# Deployment Guide 🚀

This guide explains how CodeProb is deployed and how to set up your own instance.

## 🌐 Live Deployment

CodeProb is automatically deployed to GitHub Pages using GitHub Actions. Every push to the `main` branch triggers:

1. **Content Validation** - Ensures all content is properly structured
2. **Testing** - Runs the full test suite
3. **Deployment** - Publishes to GitHub Pages

## 🔧 Setting Up Your Own Instance

### 1. Fork the Repository
```bash
# Fork on GitHub, then clone
git clone https://github.com/YOUR-USERNAME/codeprob.git
cd codeprob
```

### 2. Enable GitHub Pages
1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"
4. The site will be available at `https://YOUR-USERNAME.github.io/codeprob`

### 3. Configure Repository Settings
Update these files with your information:
- `README.md` - Update URLs and repository links
- `package.json` - Update repository URL
- `CONTRIBUTING.md` - Update contact information

### 4. Customize Content
- Add your own problems, concepts, and articles
- Update `contributor-config.json` with your content
- Modify the homepage content in `index.html`

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser

### Setup
```bash
# Install dependencies
npm install

# Run tests
npm test

# Validate content
npm run validate

# Serve locally (optional)
npm run serve
```

### File Structure
```
codeprob/
├── Static Assets (served directly)
│   ├── index.html
│   ├── writer.html
│   ├── problems/
│   ├── concepts/
│   ├── articles/
│   └── assets/
├── Development Tools
│   ├── package.json
│   ├── tests/
│   └── scripts/
└── Documentation
    ├── README.md
    ├── CONTRIBUTING.md
    └── docs/
```

## 🔄 Deployment Workflow

### Automatic Deployment
1. **Push to main** → Triggers GitHub Action
2. **Run tests** → Validates content and code
3. **Deploy** → Publishes to GitHub Pages
4. **Live in ~2 minutes** → Changes are visible

### Manual Deployment
If you need to deploy manually:
```bash
# Validate everything first
npm test
npm run validate

# Push to main branch
git push origin main
```

## 📊 Monitoring

### GitHub Actions
- Check the "Actions" tab for deployment status
- All deployments are logged and traceable
- Failed deployments will show detailed error messages

### Content Validation
The deployment process validates:
- ✅ All referenced files exist
- ✅ HTML structure is valid
- ✅ Metadata is complete
- ✅ Links are not broken
- ✅ Tests pass

## 🚨 Troubleshooting

### Common Issues

**Deployment Failed**
- Check GitHub Actions logs
- Ensure all tests pass locally
- Verify content validation passes

**Content Not Showing**
- Check `contributor-config.json` format
- Ensure files are in correct directories
- Verify HTML structure matches templates

**Links Not Working**
- Use relative paths for local development
- Absolute paths work on GitHub Pages
- Check file naming conventions

**Theme Toggle Not Working**
- Ensure JavaScript files are loading
- Check browser console for errors
- Verify theme CSS variables are defined

### Getting Help
1. Check existing GitHub Issues
2. Create a new issue with:
   - Error messages
   - Steps to reproduce
   - Browser/environment info
3. Tag with appropriate labels

## 🔒 Security

### Content Security
- All content is static HTML/CSS/JS
- No server-side processing
- No user data collection
- No authentication required

### Repository Security
- Dependabot enabled for dependency updates
- GitHub Actions use pinned versions
- No secrets or API keys required

## 📈 Performance

### Optimization Features
- **Static files only** - Fast loading
- **Minimal JavaScript** - Quick interactions
- **Responsive design** - Works on all devices
- **CDN delivery** - GitHub Pages global CDN

### Monitoring Performance
- Use browser dev tools
- Check Core Web Vitals
- Monitor GitHub Pages analytics

## 🌍 Custom Domain (Optional)

To use a custom domain:

1. **Add CNAME file**:
```bash
echo "your-domain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

2. **Configure DNS**:
   - Add CNAME record pointing to `YOUR-USERNAME.github.io`
   - Wait for DNS propagation

3. **Enable HTTPS**:
   - GitHub Pages will automatically provision SSL
   - May take a few minutes to activate

## 🚀 Scaling Up

### Growing Your Community
- **Social media** - Share on Twitter, Reddit, etc.
- **Developer communities** - Post in programming forums
- **Educational partnerships** - Reach out to coding bootcamps
- **Content creators** - Collaborate with programming YouTubers

### Technical Scaling
- GitHub Pages handles high traffic automatically
- Static architecture scales infinitely
- Consider CDN for even faster global delivery
- Monitor usage with GitHub insights

---

**Ready to deploy?** Follow the steps above and your CodeProb instance will be live in minutes! 🎉