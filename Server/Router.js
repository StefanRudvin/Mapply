import express, { Router } from 'express';
// Import index action from movies controller
import { index } from './controllers/Markers';

// Initialize the router
const router = Router();

// Handle /markers.json route with index action from markers controller
router.route('/Markers.json')
    .get(index);

export default router;