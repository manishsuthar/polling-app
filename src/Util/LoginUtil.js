import userData from "../users.json";
export const ValidateUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const user = userData.users.find((e) => e.id === username);
    if (!user) {
      resolve({
        result: null,
        error: "Invalid User",
      });
    } else {
      if (user.password === password) {
        resolve({ result: { name: user.name, id: user.id }, error: null });
      } else {
        resolve({ result: null, error: "Invalid Password" });
      }
    }
  });
};
