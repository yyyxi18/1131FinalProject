import express from 'express';
import passport from 'passport';
var auth = express.Router();

// Google OAuth 起始點
auth.get('/google/callback', passport.authenticate('google', {
    scope: ['email', 'profile'] // 要求的 Google OAuth 資訊
}));

// Google OAuth 回呼點
auth.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }), 
  (req, res) => {
    // 驗證成功後，將用戶資訊發送到前端
    res.json({
      success: true,
      user: req.user, // 這是由 Passport.js 提供的用戶資訊
    });
  }
);


// 測試用的個人資料頁面
auth.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('http://localhost:2004/profile'); // 未登入則重定向到 Google 登入
  }
  // 渲染用戶資訊
  res.render('profile', { 
    user: req.user 
  });
});

auth.get('/google/callback', (req, res) => {
  console.log(req.query); // 檢查是否有 code
});


export default auth;
