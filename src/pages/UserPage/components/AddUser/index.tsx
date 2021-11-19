import React, { FormEvent, useContext, useState } from "react";
import { MydModalWithGrid } from "../../../../components/Modal/Modal";
import { http } from "../../../../utils/http";
import { User } from "../../../../types/index";
import { UserContext } from "../../../../components/Context/UserContext";
import { validEmail } from "../../../../components/Regex/regex";

export const AddUser: React.FC = () => {
  const context = useContext(UserContext);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
 
  const handleInsertUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elements: any = e.currentTarget.elements;
    const dataUser = {
      name: elements.name.value,
      username: elements.username.value,
      email: elements.email.value,
      website: elements.website.value,
    };
    if (!validEmail.test(dataUser.email)) setErrorEmail(true);
    
      
    
    else{
      setErrorEmail(false);
       http
      .post("/users", dataUser)
      .then((res) => {
        context.addUser?.(res.data);
        elements.name.value = "";
        elements.username.value = "";
        elements.email.value = "";
        elements.website.value = "";
        alert("کاربر جدید با موفقیت ایجاد شد");
      })
      .catch((err) => {
        alert("متاسفانه با خطا مواجه شد");
      });
    }
  };

  return (
    <div className="col-lg-12 mt-3">
      <div className="card">
        <div className="card-header bg-success text-white ">افزودن کاربر</div>
        <div className="card-body">
          <form className="row" onSubmit={handleInsertUser}>
            <div className="col-lg-6 mt-3">
              <label>نام و نام خانوادگی</label>
              <input
                name="name"
                className='form-control'
              />
            </div>
            <div className="col-lg-6 mt-3">
              <label>نام کاربری</label>
              <input
                name="username"
                className="form-control"
              />
            </div>
            <div className="col-lg-6 mt-3">
              <label>ایمیل</label>
              <input
                name="email"
                className={`form-control ${errorEmail ? 'err' : ''}`}
               
              />
            </div>

            <div className="col-lg-6 mt-3">
              <label>وبسایت</label>
              <input
                name="website"
                className="form-control"
              />
            </div>
            <div className="col-lg-12 mt-3 " style={{ textAlign: "left" }}>
              <button className="btn btn-success px-4">افزودن</button>
            </div>
            <div className="col-lg-12 mt-3 ">
              {errorEmail && (
                <p className="text-danger ">آدرس ایمیل نامعتبر است</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
