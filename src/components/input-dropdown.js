import axios from "axios";
import React, { useEffect, useState } from "react";

function InputDropdown() {
  const USER_LIST_API = "https://jsonplaceholder.typicode.com/users";
  const [initUsersList, setInitUsersList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    getAllList();
  }, []);

  const getAllList = async () => {
    const response = await axios.get(USER_LIST_API);
    setInitUsersList(response.data);
  };

  const onFoucsInput = (val) => {
    let arr = [];
    if (textInput.length > 0) {
      arr = initUsersList.filter((user) => {
        const regex = new RegExp(`${val}`, "gi");
        return user.name.match(regex);
      });
    }
    setFilterList(arr);
    setTextInput(val);
  };

  const onChooseUser = (selectedName) => {
    alert(`Selected : ${selectedName}`);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          id="list"
          name="list"
          value={textInput}
          onChange={(e) => onFoucsInput(e.target.value)}
          style={{ width: "50%", height: "2rem" }}
        />
        <ul
          style={{
            listStyleType: "none",
            backgroundColor: "#f3f3f3",
            width: "50%",
            borderRadius: "5px",
            padding: 0,
          }}
        >
          {textInput.length > 0 &&
            filterList.map((user) => {
              return (
                <li
                  style={{
                    cursor: "pointer",
                    marginBottom: "10px",
                    fontSize: "1rem",
                    padding: ".5rem",
                  }}
                  key={user.id}
                  onClick={() => onChooseUser(user.name)}
                >
                  {user.name}
                </li>
              );
            })}
        </ul>
      </form>
    </div>
  );
}

export default InputDropdown;
