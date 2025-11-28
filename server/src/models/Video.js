import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: 'Untitled Video',
    },
    simulatedViews: {
        type: Number,
        default: 0,
    },
    simulatedLikes: {
        type: Number,
        default: 0,
    },
    simulatedCTR: {
        type: Number,
        default: 4.5,
    },
    proxiesUsed: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
