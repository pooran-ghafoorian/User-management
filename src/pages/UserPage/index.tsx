import React, { useCallback, useState } from "react";
import { Layout } from "../../components/layout";
import { AddUser } from "./components/AddUser";
import { UserList } from "./components/UserList";
import { User } from "../../types/index";
import {
  UserContext,
  USER_CONTEXT_INIT_STATE,
} from "../../components/Context/UserContext";

export const UserPage = () => {
  const [data, setData] = useState<User[]>([]);
  const addBatchUser = (user: User[]) => setData([...user]);
  const deleteUser = (user: User) =>
    setData(data.filter((item) => item.id != user.id));
  const addUser = (user: User) => setData([...data, user]);
  const updateUser = (user: User) =>
    setData(data.map((oldUser) => (oldUser.id === user.id ? user : oldUser)));

  return (
    <Layout>
      <div className="container home">
        <div className="row">
          <UserContext.Provider
            value={{
              ...USER_CONTEXT_INIT_STATE,
              data,
              addBatchUser,
              deleteUser,
              addUser,
              updateUser,
            }}
          >
            <AddUser />
            <UserList />
          </UserContext.Provider>
        </div>
      </div>
    </Layout>
  );
};
