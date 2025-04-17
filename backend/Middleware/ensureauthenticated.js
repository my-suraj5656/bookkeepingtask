const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is required." });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is invalid or expired." });
  }
};

module.exports = ensureAuthenticated;
const arr = ["The quick brown fox jumped over the lazy dog", "o"];

function smallestword(arr) {
    const letter = arr.splice(arr.length - 1)
    // console.log(letter);

    let result = []
    arr.forEach((item) => {
        let data = item.split(" ")
        // console.log(data);

        let allstr = []
        data.forEach((item) => {
            // console.log(typeof item);
            if (item.includes(letter)) {
                allstr.push(item)

            }
        })
        // console.log(allstr);

        let shortword = allstr[0]

        for (let i = 1; i < allstr.length; i++) {
            if (allstr[i].length <= shortword.length) {
                shortword = allstr[i]
                result.push(shortword)
                break
            }
        }
    })
    return result.join("")
}

let finalres = smallestword(arr)
console.log(finalres);
