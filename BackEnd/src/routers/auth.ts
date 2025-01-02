import express from 'express';
import passport from 'passport';
var auth = express.Router();

// Google OAuth 起始點
auth.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile'] // 要求的 Google OAuth 資訊
}));
const routers = express.Router();

// Google OAuth 起始點
auth.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile'] // 要求的 Google OAuth 資訊
}));

// Google OAuth 回呼點
auth.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }), // 如果失敗，重定向到首頁
  (req, res) => {
    // 成功驗證後，可以進行重定向或返回用戶資訊
    res.redirect('/profile'); // 重定向到你的個人資料頁面
  }
);

// 測試用的個人資料頁面
auth.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/google'); // 未登入則重定向到 Google 登入
  }
  // 渲染用戶資訊
  res.render('profile', { 
    user: req.user 
  });
});

export default auth;
