import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    enrollmentStatus: {
        type: String,
        enum: ['Open', 'Closed', 'In Progress'],
        default: 'Open',
    },
    thumbnail: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    schedule: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    prerequisites: {
        type: [String],
        default: [],
    },
    syllabus: [
        {
            week: {
                type: Number,
                required: true,
            },
            topic: {
                type: String,
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
        },
        // Additional weeks and topics...
    ],
    students: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // Reference the User model
            },
        },
        // Additional enrolled students...
    ],
});
export default mongoose.model("Course", courseSchema);
//# sourceMappingURL=Course.js.map