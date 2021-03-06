const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const mongooseeder = require("mongooseeder");
const models = require("../models/index");
const {
  Student,
  Teacher,
  Profile,
  Classroom,
  Task,
  AssignedTask,
  PointReward,
  LootReward
} = models;
const mongodbUrl = "mongodb://localhost/final_project";
const faker = require("faker");

const { RewardEvent, Messages } = require("../models/events");

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: false,
  mongoose: mongoose,
  seeds: () => {
    let students = [];
    let teachers = [];
    let profiles = [];
    let classrooms = [];
    let tasks = [];
    let rewards = [];

    // Students.
    for (let s = 0; s < 5; s++) {
      process.stdout.write(".");
      const student = new Student({
        email: `student${s + 1}@learn.com`,
        password: "foo",
        profile: new Profile({
          title: faker.name.title(),
          displayName: faker.name.findName(),
          avatar: faker.image.avatar(),
          gender: !!Math.round(Math.random()) ? "M" : "F",
          fname: faker.name.firstName(),
          lname: faker.name.lastName()
        }),
        classrooms: [],
        tasks: [],
        rewards: [],
        notifications: [],
        points: 100
      });
      profiles.push(student.profile);
      students.push(student);
    }

    // Teachers.
    for (let t = 0; t < 5; t++) {
      process.stdout.write(".");
      const teacher = new Teacher({
        email: `teacher${t + 1}@teach.com`,
        password: "foo",
        about: "I'm an awesome teacher bruh",
        profile: new Profile({
          title: faker.name.title(),
          displayName: faker.name.findName(),
          avatar: faker.image.avatar(),
          gender: !!Math.round(Math.random()) ? "M" : "F",
          fname: faker.name.firstName(),
          lname: faker.name.lastName()
        }),
        classrooms: [],
        tasks: [],
        rewards: [],
        notifications: []
      });
      profiles.push(teacher.profile);
      teachers.push(teacher);

      for (let r = 0; r < 5; r++) {
        process.stdout.write(".");
        const pointReward = new PointReward({
          title: faker.company.companyName(),
          description: faker.lorem.paragraph(),
          value: Math.round(Math.random() * 10 + 1),
          teacher: teachers[0]
        });

        teacher.rewards.push(pointReward);
        rewards.push(pointReward);

        process.stdout.write(".");
        const lootReward = new LootReward({
          title: faker.company.companyName(),
          description: faker.lorem.paragraph(),
          value: Math.round(Math.random() * 10 + 1),
          teacher: teachers[0]
        });

        teacher.rewards.push(lootReward);
        rewards.push(lootReward);
      }
    }

    // Classrooms.
    for (let c = 0; c < 5; c++) {
      process.stdout.write(".");
      const classroom = new Classroom({
        title: faker.company.companyName(),
        description: faker.lorem.paragraph(),
        students,
        teachers
      });
      classrooms.push(classroom);
    }

    // Rewards.

    // Tasks.
    for (let t = 0; t < 5; t++) {
      process.stdout.write(".");
      const task = new Task({
        title: faker.lorem.word(),
        description: faker.lorem.paragraph(),
        rewards,
        teacher: teachers[0],
        class: classrooms[0]
      });
      tasks.push(task);
    }

    classrooms[0].students = [...students];
    classrooms[1].students = [...students];

    teachers = teachers.map(teacher => {
      teacher.classrooms = [classrooms[0], classrooms[1]];
      teacher.tasks = [...tasks];
      teacher.rewards = [...rewards];
      return teacher;
    });

    students = students.map(student => {
      student.classrooms = [classrooms[0], classrooms[1]];
      return student;
    });

    const promiseArr = [];
    [students, teachers, classrooms, profiles, tasks, rewards].forEach(models =>
      models.forEach(model => {
        return promiseArr.push(model.save());
      })
    );
    return Promise.all(promiseArr);
  }
});
