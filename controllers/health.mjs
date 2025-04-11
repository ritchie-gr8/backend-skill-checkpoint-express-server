import connectionPool from "../utils/db.mjs";

export const checkHealth = async (req, res) => {
  try {
    await connectionPool.query("SELECT 1");
    return res.status(200).json({
      status: "OK 👌",
      db: "Connected ✅",
      message: "Server API is working 🚀",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: "ERROR",
      db: "Disconnected ❌",
      message: "Server API is working, but DB connection failed ❌",
    });
  }
};
