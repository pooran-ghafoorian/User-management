import React, { FormEvent, useContext } from "react";
import { Container, Modal } from "react-bootstrap";
import { User } from "../../types/index";
import { http } from "../../utils/http";
import { UserContext } from "../Context/UserContext";

interface Props {
  onHide: () => void;
  user?: User;
}

export function MydModalWithGrid({ user, onHide }: Props) {
  const context = useContext(UserContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const elements: any = e.currentTarget.elements;
    const data = {
      id: user.id,
      name: elements.name.value,
      username: elements.username.value,
      email: elements.email.value,
      website: elements.website.value,
    };

    http
      .put(`users/${data.id}`, data)
      .then((res) => {
        console.log(res.data);
        context.updateUser?.(data);
        onHide();
        alert("اطلاعات کاربر با موفقیت ویرایش گردید");
       
      })
      .catch(() => {
        alert("متاسفانه ویرایش با خطا مواجه شد");
      });
  };

  return (
    <Modal show={!!user} aria-labelledby="contained-modal-title-vcenter" closable onHide={onHide}>
      <Modal.Header className="bg-success">
        <Modal.Title id="contained-modal-title-vcenter">
          ویرایش اطلاعات کاربر
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <form className="row" onSubmit={handleSubmit}>
            <div className="col-lg-6 mt-3">
              <label>نام و نام خانوادگی</label>
              <input
                name="name"
                className="form-control"
                defaultValue={user?.name}
              />
            </div>
            <div className="col-lg-6 mt-3">
              <label>نام کاربری</label>
              <input
                name="username"
                className="form-control"
                defaultValue={user?.username}
              />
            </div>
            <div className="col-lg-12 mt-3">
              <label>ایمیل</label>
              <input
                name="email"
                className="form-control"
                defaultValue={user?.email}
              />
            </div>
              <div className="col-lg-12 mt-3">
              <label>وبسایت</label>
              <input
                name="website"
                className="form-control"
                defaultValue={user?.website}
              />
            </div>
            <div className="col-lg-12 mt-3 " style={{ textAlign: "left" }}>
              <button className="btn btn-success px-4">ویرایش</button>
            </div>
          </form>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
