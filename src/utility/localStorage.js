function setLocalStorageFn(data) {
  localStorage.setItem("contact", JSON.stringify(data));
}

function getLocalStorageFn() {
  return JSON.parse(localStorage.getItem("contact"));
}

export { setLocalStorageFn, getLocalStorageFn };
