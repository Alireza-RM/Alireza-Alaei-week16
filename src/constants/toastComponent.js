import toast from "react-hot-toast";

const toastComponenet = (type, color, text) => {
  const style = {
    position: "top-left",
    style: {
      border: `1px solid ${color}`,
      padding: "16px",
      color: `${color}`,
    },
    iconTheme: {
      primary: `${color}`,
      secondary: "#FFFAEE",
    },
  };
  return toast[type](text, style);
};

export default toastComponenet;
