import "dotenv/config";
import { connectDB, disconnectDB } from "./connection";
import log from "../utils/logger";
import { Announcement, Course, Quiz, Semester } from "../models";

const seed = async () => {
  try {
    // connect to DB first
    const MONGO_URI =
      process.env.MONGO_URI || "mongodb://localhost:27017/anyware";
    await connectDB(MONGO_URI);
    log.success("MongoDB connected for seeding.");

    // Cleanup existing data
    await Semester.deleteMany({});
    await Course.deleteMany({});
    await Announcement.deleteMany({});
    await Quiz.deleteMany({});
    log.warn("Existing data cleared.");

    // create semester
    const semester = await Semester.create({
      name: "Fall 2025",
      startDate: new Date("2025-09-01"),
      endDate: new Date("2026-01-15"),
      isCurrent: true,
      courses: [],
    });

    // create course
    const course = await Course.create({
      name: "Physics 02",
      description:
        "Introduction to fundamental concepts in physics including mechanics, waves, and thermodynamics.",
      instructor: "Dr. John Doe",
      semester: semester._id,
    });
    log.success("Course created.");

    // push course into semester
    semester.courses.push(course._id);
    await semester.save();
    log.success("Semester created and course linked.");

    // create announcements
    await Announcement.insertMany([
      {
        title: "Welcome to Physics 02!",
        content:
          "Classes begin on Monday. Please review the syllabus and bring your textbook.",
        author: "Dr. John Doe",
        course: course._id,
        semester: semester._id,
      },
      {
        title: "Assignment #1 Released",
        content:
          "Solve problems 1–10 from Chapter 2 and submit before next Friday.",
        author: "Dr. John Doe",
        course: course._id,
        semester: semester._id,
      },
      {
        title: "Midterm Exam Schedule",
        content: "Midterm exam on October 15, 10:00 AM, Room 201.",
        author: "Dr. John Doe",
        course: course._id,
        semester: semester._id,
      },
      {
        title: "Lab Groups Formed",
        content: "Check your emails for your assigned lab group and schedule.",
        author: "Dr. John Doe",
        course: course._id,
        semester: semester._id,
      },
    ]);
    log.success("Announcements created.");

    // create quiz
    await Quiz.create({
      course: course._id,
      topic: "Introduction to Mechanics",
      dueDate: new Date("2025-10-10"),
      questions: [
        {
          question: "What is the SI unit of force?",
          options: ["Newton", "Joule", "Watt", "Pascal"],
          answer: 0,
        },
        {
          question: "Which of the following is a vector quantity?",
          options: ["Speed", "Distance", "Velocity", "Mass"],
          answer: 2,
        },
        {
          question: "What is the acceleration due to gravity on Earth?",
          options: ["9.8 m/s²", "1.6 m/s²", "3.7 m/s²", "24.8 m/s²"],
          answer: 0,
        },
      ],
      semester: semester._id,
    });
    log.success("Quiz created.");

    log.success("Database seeded successfully!");
  } catch (err) {
    log.error("Error seeding database:");
    console.error(err);
  } finally {
    await disconnectDB();
    process.exit(0);
  }
};

seed();
