import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
// toast and icons
import { BiPencil, BiSolidTrashAlt } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [items, setItems] = useState([]);

  // state for username
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  // state for update
  const [isEditing, setIsEditing] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});

  const deleteItem = (id) => {
    const remaining = items.filter((item) => item.id !== id);
    setItems(remaining);
    toast.error("Deleted Successfully!");
  };

  const updateItem = (id) => {
    setIsEditing(true);
    setItemToEdit(items.find((item) => item.id === id));
  };

  // for the perfect sync with items to edit on input
  useEffect(() => {
    setUsername(itemToEdit.username);
    setRole(itemToEdit.role);
  }, [itemToEdit]);

  const submitHandler = () => {
    if (username) {
      if (isEditing) {
        const updatedItems = items.map((item) => {
          if (item.id === itemToEdit.id) {
            const updatedItem = { ...item, username, role };
            return updatedItem;
          } else {
            return item;
          }
        });
        setItems(updatedItems);
        setUsername("");
        setRole("");
        setIsEditing(false);
        setItemToEdit({});
        toast.success("Successfully updated!");
      } else {
        // create new data into db
        const newItem = {
          id: uuidv4(),
          username,
          role,
        };
        console.log(newItem);
        setItems([...items, newItem]);
        toast.success("Successfully created!");
      }
      setUsername("");
      setRole("");
    } else {
      toast.error("Username is required!");
    }
  };

  return (
    <div>
      <Toaster />
      <main className="flex justify-center items-center w-screen h-screen flex-col gap-5">
        <h2 className="font-semibold text-2xl -mt-12 py-2 text-gray-500 border-b border-gray-500">
          Curd App
        </h2>
        <section className="w-1/2 lg:w-1/3 h-auto py-5 px-3 rounded-xl shadow-lg bg-slate-50">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-semibold">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className=" p-2 shadow rounded-md font-semibold"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username" className="font-semibold">
              Role:
            </label>
            <input
              type="text"
              id="username"
              className="p-2 shadow rounded-md font-semibold"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <button
            className=" w-full mt-4 py-2 px-4 bg-cyan-500 rounded-md text-white font-semibold"
            onClick={submitHandler}
          >
            {isEditing ? "Edit" : "Add"}
          </button>
        </section>
        {items.length > 0 ? (
          items.map((item) => {
            return (
              <section className="w-1/2 lg:w-1/3 h-auto py-3 rounded-xl shadow-md bg-slate-50">
                <div className="flex justify-between items-center px-5">
                  <div className="flex gap-1 items-start flex-col">
                    <span className="font-semibold mx-3">{item.username}</span>
                    <span className="font-normal text-sm mx-3 text-gray-500">
                      {item.role}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="py-2 px-4 bg-cyan-500 rounded-md text-white font-semibold"
                      onClick={() => updateItem(item.id)}
                    >
                      <BiPencil />
                    </button>
                    <button
                      className="py-2 px-4 bg-cyan-500 rounded-md text-white font-semibold"
                      onClick={() => deleteItem(item.id)}
                    >
                      <BiSolidTrashAlt />
                    </button>
                  </div>
                </div>
              </section>
            );
          })
        ) : (
          <section className="w-1/2 lg:w-1/3 h-auto py-3 rounded-lg shadow-md bg-slate-50">
            <div className="flex justify-center items-center px-5 font-semibold">
              No Records Found!
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
