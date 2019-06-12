const express = require("express");
const exphbs = require("express-handlebars");
const data = require("./data");
const restaurants = require("./restaurants");
const app = express();
const port = 3000;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

app.engine("handlebars", exphbs({ default: "main" }));
app.set("view engine", "handlebars")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('css'))

app.get("/", (req, res) => {
  let randomNum = getRandomInt(0, restaurants.restaurants.length);
  res.render("home", { name: restaurants.restaurants[randomNum] });
});

app.get("/students", (req, res) => {
  res.send(data.students);
});

app.get("/restaurants", (req, res) => {
  res.render("restaurants", { restaurants: restaurants.restaurants });
});

app.post("/students", (req, res) => {
  const { name } = req.body;
  data.students.push(name);
  res.sendStatus(201);
});

app.post("/restaurants", (req, res) => {
  const { restaurantName } = req.body;
  restaurants.restaurants.push(restaurantName);
  res.sendStatus(201);
});

let selectTwoStudents = () => {
  data.lunchStudents = [];
  let randomStudentIndex1 = getRandomInt(0, data.students.length);
  let randomStudentIndex2 = getRandomInt(0, data.students.length);
  let student1 = data.students[randomStudentIndex1];
  let student2 = data.students[randomStudentIndex2];
  while (student1 === student2) {
    console.log("here");
    randomStudentIndex2 = getRandomInt(0, data.students.length);
    student2 = data.students[randomStudentIndex];
  }
  data.lunchStudents = [student1, student2];
  data.counts[student1] ? data.counts[student1] += 1 : data.counts[student1] = 1;
  data.counts[student2] ? data.counts[student2] += 1 : data.counts[student2] = 1;
  console.log(data.counts);
}

app.get("/lunchtime", (req, res) => {
  let randomRestaurantIndex = getRandomInt(0, restaurants.restaurants.length);
  selectTwoStudents();
  console.log("here");
  res.render("lunchtime", { 
    studentName1: data.lunchStudents[0],
    studentName2: data.lunchStudents[1],
    restaurantName: restaurants.restaurants[randomRestaurantIndex]
   });
});

app.use((err, req, res, next) => {
  console.log("my apps error", err);
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})