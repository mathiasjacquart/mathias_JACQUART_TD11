const User = require("../models/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const Avatar = require("avatar-initials");
// const randomColor =  require("randomcolor");
// const color = randomColor();

const createTokenLogin = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3600s" });
};

// const generateAvatar = (username) => {
//   const avatar = new Avatar(username, {
//     height: 200,
//     width: 200,
//     fontSize: 100,
//     fontWeight: 400,
//     borderRadius: 100,
//     textColor: '#FFFFFF',
//     bgColor: color
//   });
//   return avatar;
// }

const signupUser = async (req, res) => {
  const { username, password, gender } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashPassWord = await bcrypt.hash(password, salt);
      
      // const avatar = generateAvatar(username);

      const user = new User({
        username,
        password: hashPassWord,
        gender,
        // avatar: avatar.create()
      });

      await user.save();
      res.status(200).json({
        status:200,
        message: `Bienvenue `
      });
    } else {
      res.status(400).json({
        message: "Nom d'utilisateur déjà existant",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signinUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      if (!user.token) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = createTokenLogin(user._id);
          res.status(200).json({ user, token });
        } else {
          res.status(400).json({ message: "Mauvais Email et/ou Password" });
        }
      } else {
        res.status(400).json({ message: "Email non validé" });
      }
    } else {
      res.status(400).json({ message: "Mauvais Email et/ou Password" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  signinUser,
};
