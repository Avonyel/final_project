// provide router based on URL
module.exports = (req, res) => {
  switch (req.params.resource) {
    case "users":
      return require("./users");
    case "profiles":
      return require("./profiles");
    case "teachers":
      return require("./teachers");
    case "students":
      return require("./students");
    case "classes":
      return require("./classes");
    case "tasks":
      return require("./tasks");
    case "rewards":
      return require("./rewards");
  }
};
