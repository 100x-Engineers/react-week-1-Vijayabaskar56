export const Registration = async (userInfo, appurl) => {
  await fetch(appurl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
};
