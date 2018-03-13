import express, { Router } from 'express';
// Import index action from movies controller
import { index } from './controllers/Markers';
import { create } from './controllers/Markers';

// Initialize the router
const router = Router();

// Handle /markers.json route with index action from markers controller
router.route('/Markers.json')
    .get(index);

router.route('/markers')
    .post(create);

export default router;