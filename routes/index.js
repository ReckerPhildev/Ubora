import { Router } from 'express';
const router = Router();
import { ensureAuthenticated, forwardAuthenticated } from '../config/auth';

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

export default router;
