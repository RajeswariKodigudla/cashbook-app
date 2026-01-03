# 🚀 Quick Guide: Upload to GitHub (5 Minutes)

## **Super Quick Steps**

### **1. Create Repository on GitHub**
- Go to: https://github.com/new
- Name: `cashbook-app`
- Make it **Public**
- **Don't** check any boxes
- Click **"Create repository"**

---

### **2. Open PowerShell in Project Folder**

**Navigate to your project:**
```bash
cd C:\Users\rajes\OneDrive\Dokumen\Desktop\React\cashbook_app
```

---

### **3. Run These Commands**

**Copy-paste all at once:**

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Cashbook app"

# Add remote (REPLACE YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/cashbook-app.git

# Rename branch
git branch -M main

# Push to GitHub
git push -u origin main
```

---

### **4. If Asked for Authentication**

**Username:** Your GitHub username  
**Password:** Use a **Personal Access Token**

**To create token:**
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. Select `repo` scope
5. Copy token and use as password

---

### **5. Done! ✅**

**Your project is now at:**
```
https://github.com/YOUR_USERNAME/cashbook-app
```

---

## **Or Use the Batch Script**

**Double-click:** `upload-to-github.bat`

**It will guide you through the process!**

---

## **That's It! 🎉**

**For detailed instructions, see:** `UPLOAD_TO_GITHUB_STEPS.md`


