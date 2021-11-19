import React, { useContext, useEffect, useState } from "react";
import { FaUserEdit, FaUserTimes } from "react-icons/fa";
import { UserContext } from "../../../../components/Context/UserContext";
import { MydModalWithGrid } from "../../../../components/Modal/Modal";
import { User } from "../../../../types";
import { http } from "../../../../utils/http";

export const UserList = () => {
  const context = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  useEffect(() => {
    http.get("users").then((response) => {
      const users: User[] = response.data;
      context.addBatchUser?.(users);
    });
  }, []);

  const handleDelete = (user: User) => {
    http
      .delete(`users/${user.id}`)
      .then((res) => {
        context.deleteUser?.(user);
        alert("کاربر با موفقیت حذف گردید");
      })
      .catch(() => {
        alert("متاسفانه حذف کاربر با خطا مواجه شد");
      });
  };

  const handleCurrentUser = (user: User) => {
    if (user) {
      setCurrentUser(user);
    }
  };

  return (
    <div className="col-lg-12 mt-5">
      <div className="card">
        <div className="card-header bg-success text-white">نمایش کاربران</div>
        <div className="card-body ">
          <div className="table-responsive">
            <table className="table align-middle table-striped table-hover">
              <thead>
                <tr>
                  <th>شناسه</th>
                  <th>نام کاربری</th>
                  <th> نام و نام خانوادگی</th>
                  <th>ایمیل</th>
                  <th>وبسایت</th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {context.data.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.website}</td>
                    <td>
                      <FaUserEdit
                        className="text-success"
                        onClick={() => handleCurrentUser(user)}
                      />
                      <FaUserTimes
                        className="text-danger"
                        onClick={() => handleDelete(user)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <MydModalWithGrid
        onHide={() => setCurrentUser(undefined)}
        user={currentUser}
        
      />
    </div>
  );
};
