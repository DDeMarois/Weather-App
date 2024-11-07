import { Router } from 'express';
const router = Router();

import apiRoutes from './api/index.js';
import path from 'path';
import htmlRoutes from './htmlRoutes.js';

router.use('/api', apiRoutes);

router.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/public/index.html'));
});

router.use('/', htmlRoutes);

export default router;
