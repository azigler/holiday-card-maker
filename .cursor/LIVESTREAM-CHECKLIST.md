# 🎥 Livestream Checklist - Holiday Card Maker

Quick reference for using the Holiday Card Maker on Dev Interrupted's livestream.

---

## ⚡ Quick Start

```bash
npm install
npm run dev
# Open http://localhost:5173
```

---

## 🎯 Demo Flow (5 min)

### Show Off the Base App
1. ✅ Open the app - show wood desktop, snow falling
2. ✅ Try a few tools:
   - Pen tool - draw something
   - Brush tool - show sparkle/calligraphy
   - Spray paint - hold and spray
   - Shapes - rectangle, circle, star
3. ✅ Add stickers:
   - Drag a snowflake
   - Click some Dev Interrupted branding
   - Show how they're moveable with Select tool
4. ✅ Show features:
   - Undo/redo (Ctrl+Z)
   - Color picker
   - Size slider
   - Format selector (landscape/portrait/square)
5. ✅ Export:
   - Click "DONE!" button
   - Show export options
   - Download a card

**💡 Have a pre-made card ready to show as example!**

---

## 🎨 Extension Challenges (20-45 min each)

### Option 1: Start Easy 🟢

**📸 Upload Image Sticker** (20-30 min)
- Show how to add file upload button
- Demo uploading a funny photo
- Watch it become a sticker on the card
- **Viral Moment:** Upload host faces!

**🎭 Emoji Picker** (20-30 min)
- Add emoji tool
- Show native picker or custom grid
- Spam emojis all over a card
- **Viral Moment:** Emoji battle!

### Option 2: Visual Wow 🔥

**🌈 Gradient Tool** (30-45 min)
- Create beautiful gradients
- Show linear and radial options
- Make a stunning background
- **Viral Moment:** Gradient competition!

**🎨 Rubber Stamp Tool** (30-45 min)
- Create stamp presets (heart, star, snowflake)
- Click to stamp patterns
- Make a border
- **Viral Moment:** Stamp art!

### Option 3: AI Hype 🤖

**🤖 AI Sticker Generation** (45-75 min)
- Integrate Nanobanana (or DALL-E)
- Type funny prompts
- Watch AI create stickers
- Add them to cards
- **Viral Moment:** Ridiculous AI prompts!
  - "penguin doing taxes"
  - "Santa at a rave"
  - "snowman riding a motorcycle"

---

## 🗳️ Community Voting

Let chat decide which challenge to do!

**Post in chat:**
```
Which extension should we add? Type:
1️⃣ Upload photos
2️⃣ Emoji picker  
3️⃣ Gradients
4️⃣ Rubber stamps
5️⃣ AI stickers
```

---

## 📁 Have These Open

### In Browser
- [ ] Holiday Card Maker running (localhost:5173)
- [ ] Extension challenges directory open
- [ ] Fabric.js docs (fabricjs.com)

### In IDE
- [ ] `extend-me/` folder visible
- [ ] Relevant challenge .md file open
- [ ] Files ready to edit:
  - `src/components/Toolbar.tsx`
  - `src/components/Canvas.tsx`
  - `src/types/tools.ts`

### Resources Tab
- [ ] QUICK-REFERENCE.md open
- [ ] API docs (if doing AI challenge)

---

## 🎬 Streaming Tips

### Before Stream
- ✅ Test the base app works
- ✅ Clear localStorage (fresh start)
- ✅ Have a test card ready to show
- ✅ Close unnecessary tabs/apps
- ✅ Zoom text size for readability

### During Stream
- 📖 Share the challenge doc in chat
- 💬 Read the "Why This Is Cool" section
- 👀 Show the code examples
- ⌨️ Code along with the guide
- 🐛 Debug out loud (it's educational!)
- 🎉 Celebrate when it works!

### Pro Moves
- Split screen: code + running app
- Console open to show state/errors
- Commit after each feature works
- Share git repo link in chat

---

## 💬 Chat Engagement

### Questions to Ask Chat
- "Which tool should we add first?"
- "What should we generate with AI?"
- "What emoji should we add?"
- "Should we make this feature easier or fancier?"

### Call-to-Actions
- "Try this yourself! Link in chat"
- "Share your cards with #HolidayCardMaker"
- "Who wants to remix this on v0?"
- "What feature should we add next?"

---

## 🚨 Troubleshooting

### If Something Breaks
1. Check console for errors
2. Read the error message out loud
3. Check the challenge doc
4. Look at similar code in codebase
5. Ask chat for ideas!

### Common Issues
- **Tool doesn't appear:** Check Tool enum and toolbar array
- **Click doesn't work:** Check mouse event handler
- **Object doesn't show:** Call `canvas.renderAll()`
- **API fails:** Check API key and network tab

### Emergency Reset
```bash
# Clear localStorage
localStorage.clear()

# Restart dev server
npm run dev
```

---

## 🎉 Wrap Up (5 min)

### Show What We Built
1. Switch to app
2. Use the new feature(s)
3. Create a card with everything
4. Export and show final result

### Share Links
- v0 link (if uploaded)
- GitHub repo
- Extension challenges
- Community hashtag

### Thank You
- Thank chat for participating
- Encourage them to try extensions
- Share what's coming next
- Holiday wishes! 🎄

---

## 📊 Time Estimates

**Full Stream Options:**

### 1 Hour Stream
- 5 min: Demo base app
- 40 min: One medium/advanced challenge
- 10 min: Show results + wrap up
- 5 min: Q&A

### 2 Hour Stream
- 5 min: Demo base app
- 30 min: Easy challenge
- 45 min: Advanced challenge  
- 30 min: Show results + experiments
- 10 min: Wrap up + Q&A

### 3 Hour Stream
- 10 min: Demo base app
- 25 min: Upload images
- 25 min: Emoji picker
- 45 min: AI generation
- 45 min: Community remixes/experiments
- 30 min: Q&A + wrap up

---

## 🎯 Success Metrics

Stream was successful if:
- ✅ At least 1 extension challenge completed
- ✅ Created and exported a card
- ✅ Chat was engaged and participating
- ✅ Code worked (eventually!)
- ✅ Everyone had fun!

---

## 🔗 Quick Links

- **Main README:** [README.md](./README.md)
- **Extension Challenges:** [extend-me/README.md](./extend-me/README.md)
- **Quick Reference:** [extend-me/QUICK-REFERENCE.md](./extend-me/QUICK-REFERENCE.md)
- **Implementation Details:** [EXTENSIBILITY.md](./EXTENSIBILITY.md)

---

## 💡 Bonus Ideas

**If Ahead of Schedule:**
- Try bonus features from challenges
- Let chat suggest wild AI prompts
- Create cards together as a group
- Start another challenge
- Experiment with combining features

**If Behind Schedule:**
- Skip to the working code example
- Paste instead of typing
- Focus on showing rather than building
- Save debugging for after stream

---

**You've got this!** 🎉🎙️

The extension challenges are designed to be stream-friendly. Just follow the docs, have fun, and engage with chat!

**Happy Streaming!** 🎥✨

