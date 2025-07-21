const validationForm = (obj) => {
  const error = {};

  //   name

  if (!obj.name.trim()) {
    error.name = "لطفا نام مخاطب را وارد کنید";
  } else if (obj.name.trim().length < 7) {
    error.name = "لطفا حداقل 7 کاراکتر وارد کنید";
  } else delete error.name;

  //   email

  if (!obj.email.trim()) {
    error.email = "لطفا ایمیل را وارد کنید";
  } else if (obj.email.trim().length < 7) {
    error.email = "لطفا حداقل 7 کاراکتر وارد کنید";
  } else delete error.email;

  //   job

  if (!obj.job.trim()) {
    error.job = "لطفا شغل را وارد کنید";
  } else delete error.job;

  // phone

  if (!obj.phone.trim()) {
    error.phone = "لطفا تلفن همراه خود را وارد کنید";
  } else if (obj.phone.trim().length < 11) {
    error.phone = "شماره معتبر وارد کنید";
  } else delete error.phone;

  return error;
};

export default validationForm;
