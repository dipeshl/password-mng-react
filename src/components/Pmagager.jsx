import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Trash2, SquarePen } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import "react-toastify/dist/ReactToastify.css";

const Pmagager = () => {
  //toast data
  const toastData = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
  });

  //save the data into the local storage
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    let data = localStorage.getItem("data");
    if (data) {
      setLocalData(JSON.parse(data));
    }
  }, []);

  const savePassword = () => {
    toast("saving..", {
      toastData,
    });
    setLocalData([...localData, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "data",
      JSON.stringify([...localData, { ...form, id: uuidv4() }])
    );
    setForm({ name: "", username: "", password: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // deleting the data
  const deletePassword = (id) => {
    toast("Deleted sucessfully.. ", {
      toastData,
    });
    setLocalData(localData.filter((item) => item.id !== id));
    localStorage.setItem(
      "data",
      JSON.stringify(localData.filter((item) => item.id !== id))
    );
  };

  // editing the data
  const editPassword = (id) => {
    setForm(localData.filter((item) => item.id === id)[0]);
    setLocalData(localData.filter((item) => item.id !== id));
  };
  //copy to text
  const copyText = (text) => {
    toast("Copied to clipboard...", {
      toastData,
    });
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      {/* Toast */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* for backgorud color */}
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>
      {/* form */}
      <div className="mx-auto max-w-2xl bg-slate-100 shadow-xl rounded-md h-60 p-2 mt-10">
        <h1 className="mt-5 flex justify-center ">Password Manager</h1>
        <div className="flex flex-col p-4 gap-5 ">
          <input
            onChange={handleChange}
            value={form.name}
            name="name"
            type="text"
            className="rounded-full shadow p-2 mx-2 "
            placeholder="Enter your Name..."
          />
          <div className=" flex gap-5 w-full justify-between">
            <input
              onChange={handleChange}
              value={form.username}
              name="username"
              type="text"
              className="rounded-full shadow w-full p-1 mx-2"
              placeholder="Enrer your Username..."
            />
            <input
              onChange={handleChange}
              value={form.password}
              name="password"
              type="password"
              className="rounded-full shadoww w-full p-1 mx-2 "
              placeholder="Enter your Password..."
            />
          </div>
          <div className="flex justify-center mt-2 ">
            <button
              onClick={savePassword}
              className="bg-blue-200 rounded-full shadow w-12  justify-center flex hover:bg-blue-500"
            >
              save
            </button>
          </div>
        </div>
        {/* showing the items */}

        <div className="p-5 mt-10 bg-purple-100 shadow-xl rounded-md">
          {localData.length === 0 && <div>No Data found !</div>}

          {localData.length != 0 && (
            <>
              <h2 className="font-medium">Your Passwords</h2>
              <table className="table-auto overflow-hidden w-full">
                <thead className="bg-purple-200 w-full">
                  <tr>
                    <th className="py-2">Name</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="w-full overflow-hidden ">
                  {localData.map((item, index) => (
                    <tr key={index}>
                      <td
                        onClick={() => copyText(item.name)}
                        className="text-center  hover:cursor-pointer"
                      >
                        {item.name}
                      </td>
                      <td
                        onClick={() => copyText(item.username)}
                        className="text-center hover:cursor-pointer "
                      >
                        {item.username}
                      </td>
                      <td
                        onClick={() => copyText(item.password)}
                        className="text-center hover:cursor-pointer "
                      >
                        {item.password}
                      </td>

                      <td className="text-center hover:cursor-pointer flex gap-2 justify-center mt-1">
                        {/* edit button */}
                        <span onClick={() => editPassword(item.id)}>
                          {" "}
                          <SquarePen height={18} />
                        </span>
                        {/* delete button */}
                        <span onClick={() => deletePassword(item.id)}>
                          {" "}
                          <Trash2 height={18} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Pmagager;
