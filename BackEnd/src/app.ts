import express from 'express';
import { router } from "./Routers";
import { logger } from './middlewares/log';
import http from 'http';
import cors from 'cors';
import { MongoDB } from './utils/MongoDB';
import session from 'express-session'; // 用於管理會話
import passport from './config/passport'; // 引入 Passport 配置
require('dotenv').config();

const app: express.Application = express();
const server = http.createServer(app);

// MongoDB 初始化
export const DB = new MongoDB({
  name: process.env.DBUSER as string,
  password: process.env.DBPASSWORD as string,
  host: process.env.DBHOST as string,
  port: process.env.DBPORT as string,
  dbName: process.env.DBNAME as string,
});

// CORS 設定
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 200,
  "exposedHeaders": ['Content-Disposition'],
}));

// Body parser 設定
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

// 靜態資源
app.use('/assets', express.static(process.env.assetsPath as string));

// 初始化 express-session，用於保存用戶的登入狀態
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret', // 建議從環境變數設置密鑰
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // 在生產環境中啟用 HTTPS 時設為 true
    maxAge: 24 * 60 * 60 * 1000, // 1 天
  },
}));

// 初始化 Passport
app.use(passport.initialize());
app.use(passport.session());

// 加載路由
for (const route of router) {
  app.use(route.getRouter());
}

// 啟動伺服器
server.listen(process.env.PORT, () => {
  logger.info('listening on *:' + process.env.PORT);
});
