import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { peopleModel } from '../orm/schemas/peopleSchemas'; // 修正路徑

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await peopleModel.findOne({ googleId: profile.id }); // 使用模型查詢
        if (!user) {
            user = new peopleModel({ // 使用模型創建新用戶
                googleId: profile.id,
                email: profile.emails?.[0]?.value,
                name: profile.displayName,
                avatar: profile.photos?.[0]?.value,
            });
            await user.save();
        }
        return done(null, user);
    } catch (error) {
        return done(error, false); // 修正為 false
    }
}));

passport.serializeUser((user: any, done) => {
    done(null, user.id); // 將使用者 ID 存入 session
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await peopleModel.findById(id); // 使用模型查詢
        done(null, user);
    } catch (error) {
        done(error, false); // 修正為 false
    }
});

export default passport;
