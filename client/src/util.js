export const registerUser = (registerUserData) => {
  fetch("http://localhost:5000/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerUserData),
  })
    .then(async (res) => {
      const response = await res.json();
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPositions = () => {
  fetch("http://localhost:5000/position/getPositions", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(async (res) => {
      const response = await res.json();
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};
