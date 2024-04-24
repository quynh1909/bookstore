const jwt = require("jsonwebtoken");
const jwtSecret = "mysecretkey";

exports.authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Tiêu đề ủy quyền bị thiếu" });
  }

  const token = authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "Mã token bị thiếu" });
  }

  try {
    const user = jwt.verify(token, jwtSecret);
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Mã token bị hết hạn" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Mã không hợp lệ" });
    }
    return res.status(403).json({ message: "Không thể xác thực mã token" });
  }
};
