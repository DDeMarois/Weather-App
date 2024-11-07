import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

router.use(express.static(path.join(__dirname, 'public')));
import { Request, Response } from 'express';

router.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

export default router;
