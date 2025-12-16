# 🚀 v0 Deployment Guide

## Quick Fix for Common Issues

### ❌ Error: "InvalidCharacterError: Failed to execute 'btoa'"

**What it means:** The app is trying to encode Unicode characters (emojis, special text) using base64, which doesn't support them.

**✅ Fixed in latest version!** We now use `encodeURIComponent()` instead of `btoa()` for localStorage.

### Deploying to v0

#### Method 1: Direct Upload (Recommended)

1. **Build the project:**

```bash
npm run build
```

2. **Upload the `dist` folder** to v0:
   - Drag the entire `dist` folder into v0
   - OR zip the contents of `dist` and upload

3. **Verify the build:**
   - Check that `dist/index.html` exists
   - Check that `dist/assets/` contains all files

#### Method 2: From Source

1. **Zip the entire project:**

```bash
# Make sure node_modules is excluded
zip -r holiday-card-maker.zip . -x "node_modules/*" -x ".git/*" -x "dist/*"
```

2. **Upload to v0** and let it build automatically

---

## Project Structure for v0

```
holiday-card-maker/
├── index.html              ✅ At root (v0 looks here)
├── src/
│   ├── main.tsx           ✅ Entry point
│   ├── App.tsx            ✅ Main component
│   └── ...
├── public/
│   └── assets/            ✅ Static assets
├── package.json           ✅ Dependencies
├── vite.config.ts         ✅ Build config (with base: './')
└── dist/                  ✅ Built files (after npm run build)
```

---

## Configuration Changes for v0

### ✅ Already Updated

**vite.config.ts:**

```typescript
{
  base: './',  // Relative paths for portability
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          'fabric': ['fabric'],
          'react-vendor': ['react', 'react-dom'],
        }
      }
    }
  }
}
```

**index.html:**

- Uses relative paths
- Module imports work correctly

**Auto-save (useAutoSave.ts):**

- Now uses `encodeURIComponent()` instead of btoa
- Handles Unicode characters properly
- Graceful error handling

---

## Testing Before Deployment

### 1. Test Locally

```bash
# Install and run
npm install
npm run dev

# Open http://localhost:3000
```

### 2. Test Production Build

```bash
# Build
npm run build

# Preview production build
npm run preview

# Open http://localhost:4173
```

### 3. Test with Unicode

1. Add text with emojis: "Hello 🎄🎅🎁"
2. Wait 30 seconds (auto-save)
3. Refresh page
4. Should see "Restore session?" prompt
5. **No errors in console** ✅

---

## Common v0 Issues & Solutions

### Issue: "Module not found: 'fabric'"

**Solution:** Make sure `fabric` is in `dependencies`, not `devDependencies`

```json
{
  "dependencies": {
    "fabric": "^6.0.0"
  }
}
```

### Issue: "Cannot find module 'lucide-react'"

**Solution:** Install all dependencies

```bash
npm install
```

### Issue: Assets not loading (404 errors)

**Solution:** Check `vite.config.ts` has `base: './'`

### Issue: White screen on deployment

**Solution:**

1. Check browser console for errors
2. Verify `dist/index.html` exists
3. Check that module paths are relative
4. Ensure all dependencies are installed

---

## Environment Variables

### For Local Development

Create `.env.local` (optional):

```bash
# Only needed if using AI sticker generation extension
VITE_NANOBANANA_API_KEY=your_key_here
```

### For v0 Deployment

v0 may have its own environment variable system. Check v0 documentation for how to add env vars.

---

## Asset Paths

All assets use relative paths:

```typescript
// ✅ Good - Relative path
<img src="/assets/stickers/snowflake-1.svg" />

// ✅ Also good - Public folder
<img src="/wood-texture.svg" />

// ❌ Bad - Absolute path
<img src="https://yourdomain.com/assets/..." />
```

---

## Build Output

After `npm run build`, you should see:

```
dist/
├── index.html              (~1kb)
├── assets/
│   ├── index-[hash].css   (~37kb)
│   ├── index-[hash].js    (~532kb)
│   ├── fabric-[hash].js   (chunk)
│   ├── react-vendor-[hash].js (chunk)
│   └── [sticker images]
└── vite.svg
```

---

## Performance Optimization

### Already Implemented

- ✅ Code splitting (fabric.js separate chunk)
- ✅ React vendor split
- ✅ Minification enabled
- ✅ Tree shaking
- ✅ CSS purging (Tailwind)

### File Sizes

- **Total JS:** ~530kb (gzipped: ~160kb)
- **CSS:** ~37kb (gzipped: ~6kb)
- **First Load:** ~600kb (acceptable for creative app)

---

## Post-Deployment Checklist

After deploying to v0, test:

- [ ] App loads without errors
- [ ] Canvas displays correctly
- [ ] Drawing tools work
- [ ] Stickers load and can be dragged
- [ ] Text tool works with emojis ✅
- [ ] Undo/redo works
- [ ] Export works (PNG/JPG)
- [ ] Auto-save works (refresh page test)
- [ ] Mobile responsive
- [ ] No console errors

---

## Debugging v0 Issues

### Enable Debug Mode

Open browser console (F12) and check for:

```javascript
// Should NOT see these errors:
❌ InvalidCharacterError: btoa
❌ Module not found
❌ 404 errors for assets
❌ Uncaught TypeError

// Should see:
✅ Canvas initialized
✅ Assets loaded
✅ No errors
```

### Common Error Messages

| Error | Cause | Fix |
|-------|-------|-----|
| `btoa` error | Unicode in localStorage | ✅ Fixed in latest version |
| `Module not found` | Missing dependency | Run `npm install` |
| `404 for asset` | Wrong path | Check `vite.config.ts` base |
| White screen | Build failed | Check `npm run build` output |

---

## v0-Specific Features

### Local Storage

- ✅ Works on v0 (per-user)
- Saves canvas state
- Persists between sessions
- ~5MB limit

### External Resources

All external resources loaded:

- Google Fonts ✅
- No external APIs (unless you add extensions)

---

## Sharing Your v0 Deployment

After deploying:

1. **Get your v0 link:** `https://v0.dev/your-project-id`
2. **Test it thoroughly**
3. **Share on social media:**

   ```
   Check out my Holiday Card Maker! 🎄
   Create custom cards with drawing tools and stickers.
   Try it: [v0 link]
   #HolidayCardMaker #v0 #DevInterrupted
   ```

---

## Remixing on v0

For others to remix your project:

1. **Enable remixing** in v0 settings
2. **Add README.md** with instructions
3. **Document any API keys needed**
4. **Link to extension challenges** for ideas

---

## Support

### If You're Still Having Issues

1. **Check the browser console** for specific errors
2. **Try the production build locally** (`npm run build && npm run preview`)
3. **Clear localStorage** and retry
4. **Ensure all dependencies installed** (`npm install`)
5. **Verify Node.js version** (>= 18 recommended)

### Reporting Issues

If you find a bug:

1. Note the exact error message
2. Note the steps to reproduce
3. Check if it happens locally too
4. Open an issue with details

---

## Success! 🎉

Your Holiday Card Maker should now be live on v0!

**Next steps:**

- Share it with friends
- Try the [extension challenges](./extend-me/README.md)
- Customize and make it your own
- Post your creations with #HolidayCardMaker

---

**Happy Creating!** 🎨✨

*Built for Dev Interrupted's 2025 Holiday Episode*
