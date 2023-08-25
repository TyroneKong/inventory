import { useState } from "react";
import UseQueryUsers from "../../hooks/users";
import Logout from "../logout";
import SearchInput from "./search-input/search-input";
import UserQueryCurrentUser from "../../hooks/current-user";
import UserTable from "./table/user-table";

function Users() {
  const { data } = UseQueryUsers();
  const [filtering, setFiltering] = useState("");

  UserQueryCurrentUser();

  return (
    <div>
      {data && (
        <>
          <Logout />
          <SearchInput filter={{ filtering, setFiltering }} />
          <UserTable data={data} filter={{ filtering, setFiltering }} />
        </>
      )}
    </div>
  );
}

export default Users;