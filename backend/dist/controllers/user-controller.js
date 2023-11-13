import User from "../models/User.js";
import Course from "../models/Course.js";
import { hash, compare } from "bcrypt";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(401).send("User already registered");
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        return res.status(200).json({ message: "OK", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const loginSignup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not registered");
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
        return res.status(200).json({ message: "OK", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//enroll course
export const enrollCourse = async (req, res, next) => {
    try {
        const { courseId, studentId } = req.body;
        // Find the course by courseId
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        // Check if the course is closed
        if (course.enrollmentStatus === 'Closed') {
            return res.status(400).json({ message: 'Course enrollment is closed' });
        }
        // Check if the student is already enrolled in the course
        const isStudentEnrolled = course.students.some((student) => student.userId.toString() === studentId);
        if (isStudentEnrolled) {
            return res
                .status(400)
                .json({ message: 'Student already enrolled in the course' });
        }
        // Push the studentId to the students array
        course.students.push({ userId: studentId });
        // Save the updated course
        await course.save();
        // Add the course to the user
        const user = await User.findById(studentId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Add course details to user's courses array
        user.courses.push({
            course: courseId,
            status: 'Enrolled',
            progress: 0,
        });
        // Save the updated user
        await user.save();
        return res
            .status(200)
            .json({ message: 'Student added to the course and course added to user' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'ERROR', cause: error.message });
    }
};
export const completeCourse = async (req, res, next) => {
    try {
        const { courseId, studentId } = req.body;
        // Find the user by studentId
        const user = await User.findById(studentId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Find the index of the course with the given courseId in the user's courses array
        const courseIndex = user.courses.findIndex((course) => course.course.toString() === courseId);
        if (courseIndex === -1) {
            return res.status(404).json({ message: 'Course not found for the user' });
        }
        // Update the status and progress for the found course
        user.courses[courseIndex].status = 'Complete';
        user.courses[courseIndex].progress = 100;
        // Save the updated user
        await user.save();
        return res.status(200).json({ message: 'Course marked as complete for the user' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'ERROR', cause: error.message });
    }
};
//# sourceMappingURL=user-controller.js.map