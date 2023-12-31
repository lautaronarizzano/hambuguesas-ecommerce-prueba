import {
    Router
} from 'express'
import passport from 'passport';
import { register,
    failRegister,
    login,
    forgotPasswordHandler,
    logout,
    current,
    github,
    githubCallback, 
    changePassword} from '../../controllers/sessions.controller.js'
import { authenticateToken } from '../../utils/utils.js';

const router = Router()


router.post('/register', passport.authenticate('register', {
    failureRedirect: 'fail-register'
}), register)

router.get('/fail-register', failRegister)

router.post('/login', login);

router.post('/reset-password', forgotPasswordHandler)

router.post('/change-password/:token', changePassword)

router.get('/logout', authenticateToken ,logout)

router.get('/current', passport.authenticate("current", {
    session: false
}), current)

router.get('/github', passport.authenticate('github', {
    scope: ['user:email']
}), github)

router.get('/github-callback', passport.authenticate('github', {
    failureRedirect: '/login'
}), githubCallback)

export default router