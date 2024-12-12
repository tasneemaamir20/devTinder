const adminAuth = (req, res, next) => {
  console.log("auth is getting checked !!!");
  const token = "abc";
  const isAuthorized = token === "abc";
  if (!isAuthorized) {
    res.status(401).send("Request is invalid !!!");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("auth is getting checked !!!");
  const token = "abc";
  const isAuthorized = token === "abc";
  if (!isAuthorized) {
    res.status(401).send("Request is invalid !!!");
  } else {
    next();
  }
};
module.exports = { adminAuth, userAuth };
