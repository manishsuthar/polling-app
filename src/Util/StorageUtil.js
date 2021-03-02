const KEYS = {
  USER_DATA: "USER_DATA",
  POLL_INFO: "POLL_INFO",
  COUNT_INDEX: "COUNT_INDEX",
  DISHES: "DISHES",
};

const DATA_SET = {
  USER_DATA: {},
  POLL_INFO: {},
  COUNT_INDEX: null,
};

const initData = () => {
  Object.keys(KEYS).forEach((key) => {
    const data = getData(key);
    if (data) {
      if (key === KEYS.COUNT_INDEX) {
        DATA_SET[key] = Number(data);
      } else {
        DATA_SET[key] = data;
      }
    }
  });
};
const UpdateInStorage = (key) => {
  localStorage.setItem(key, JSON.stringify(DATA_SET[key]));
};
const getData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
initData();

export const savePollItem = (user, data = []) => {
  if (data.length) {
    data.forEach((node) => {
      if (!node.index) node.index = getCountIndex();
      if (!node.points) node.points = 0;
      node["user"] = user;
      updateInPollList(node, node.index);
    });
  }
  saveUserData(data, user);
};

export const saveUserData = (data, user) => {
  data["user"] = user;
  DATA_SET.USER_DATA[user] = data;
  UpdateInStorage(KEYS.USER_DATA);
};

export const getPollList = (user) => {
  const users = Object.keys(DATA_SET.USER_DATA);
  const pollItems = [];
  users.forEach((key) => {
    if (key !== user) {
      const data = DATA_SET.USER_DATA[key];
      pollItems.push(...data);
    }
  });
  return pollItems;
};

export const getAllList = () => {
  const users = Object.keys(DATA_SET.USER_DATA);
  const pollItems = [];
  users.forEach((key) => {
    const data = DATA_SET.USER_DATA[key];
    pollItems.push(...data);
  });
  return pollItems;
};

export const getUserData = (user) => {
  const data = getData(KEYS.USER_DATA);
  if (data && data[user]) {
    return data[user];
  } else {
    return [];
  }
};

export const updateInPollList = (user, data, index) => {
  const poll_list = DATA_SET.USER_DATA[user];
  const itemIndex = poll_list.findIndex((e) => e.index === index);
  if (itemIndex != -1) {
    poll_list[itemIndex] = data;
  } else {
    poll_list.push(data);
  }
};

export const getCountIndex = () => {
  let count_index = DATA_SET.COUNT_INDEX;
  if (!count_index) {
    count_index = 0;
  }
  count_index = count_index + 1;
  DATA_SET.COUNT_INDEX = count_index;
  UpdateInStorage(KEYS.COUNT_INDEX);
  return count_index;
};

export const UpdatePollCount = (user, dishes = []) => {
  const id = user.id;
  if (!DATA_SET.POLL_INFO[id]) {
    DATA_SET.POLL_INFO[id] = {};
  }
  dishes.forEach((dish) => {
    const index = dish.index;
    const poll = DATA_SET.POLL_INFO[id];
    poll[index] = dish.points;
  });
  UpdateInStorage(KEYS.POLL_INFO);
};

export const userSelectedDishes = (user) => {
  const dishes = DATA_SET.POLL_INFO[user.id];
  if (dishes) {
    const keys = Object.keys(dishes).map((e) => Number(e));
    return keys;
  } else {
    return [];
  }
};

export const getUserCountOnDish = (dishIndex, user) => {
  const pollInfo = DATA_SET.POLL_INFO;
  if (pollInfo[user.id]) {
    return pollInfo[user.Id][dishIndex];
  }
  return 0;
};

export const getDishToPointCount = () => {
  const countList = {};
  const pollInfo = DATA_SET.POLL_INFO;
  const users = Object.keys(pollInfo);
  users.forEach((user) => {
    const dishes = pollInfo[user];
    Object.keys(dishes).forEach((dish) => {
      if (!countList[dish]) {
        countList[dish] = 0;
      }
      countList[dish] = countList[dish] + dishes[dish];
    });
  });
  return countList;
};
