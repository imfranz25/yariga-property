import express from 'express';

import { createUser, getAllUsers, getUserById } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById);
router.route('/').post(createUser);

export default router;
