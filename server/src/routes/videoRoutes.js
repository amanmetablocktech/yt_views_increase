import express from 'express';
import {
    getVideos,
    getVideo,
    createVideo,
    updateVideo,
    deleteVideo,
} from '../controllers/videoController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .get(protect, getVideos)
    .post(protect, createVideo);

router.route('/:id')
    .get(protect, getVideo)
    .put(protect, updateVideo)
    .delete(protect, deleteVideo);

export default router;
