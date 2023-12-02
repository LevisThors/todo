import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { StatusSection } from "./Main";

const REQUEST_TYPE = { POST: "post", PUT: "put" };

const loadDataFromLocalStorage = () => {
    const storedData = localStorage.getItem("todoData");
    return storedData ? JSON.parse(storedData) : [];
};

const saveDataToLocalStorage = (data) => {
    localStorage.setItem("todoData", JSON.stringify(data));
};

export default function MainWithLocalStorage() {
    const [data, setData] = useState([]);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [inputData, setInputData] = useState({ name: "", status: false });
    const [openTask, setOpenTask] = useState({});

    useEffect(() => {
        setData(loadDataFromLocalStorage());
    }, []);

    const handleEdit = (id, name, status) => {
        if (isEditOpen && openTask.id === id) {
            setIsEditOpen(false);
            setInputData({ id: "", name: "", status: false });
            setOpenTask({ id: "", name: "", status: false });
        } else {
            setOpenTask({ id: id, name: name, status: status });
            setInputData({ id: id, name: name, status: status });
            setIsEditOpen(true);
        }
    };

    const handleChange = (e) => {
        let { name, type, value } = e.target;
        if (type === "select-one") value = value === "true";
        setInputData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (type) => {
        const newId = uuidv4();

        if (type === REQUEST_TYPE.PUT) {
            const updatedData = data.map((task) =>
                task.id === openTask.id
                    ? {
                          ...task,
                          name: inputData.name,
                          status: inputData.status,
                      }
                    : task
            );
            setData(updatedData);
            saveDataToLocalStorage(updatedData);
        } else if (type === REQUEST_TYPE.POST) {
            const newData = [
                ...data,
                { id: newId, name: inputData.name, status: inputData.status },
            ];
            setData(newData);
            saveDataToLocalStorage(newData);
        }
    };

    const handleDelete = (id) => {
        const updatedData = data.filter((task) => task.id !== id);
        setData(updatedData);
        saveDataToLocalStorage(updatedData);
    };
    return (
        <section>
            <div className="flex bg-white rounded-lg p-5 items-center font-semibold mx-6 mt-2">
                <h2 className="w-1/4 text-2xl">
                    {isEditOpen ? "Edit task" : "Add Task"}
                </h2>
                <form className="flex w-3/4 gap-3">
                    <div className="flex flex-col w-1/3">
                        <label className="ml-1 text-lg">Name</label>
                        <input
                            className="h-10 rounded-xl px-4 border focus:border-gray-400 outline-none"
                            name="name"
                            value={inputData.name}
                            onChange={handleChange}
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col w-1/3">
                        <label className="ml-1 text-lg">Status</label>
                        <select
                            className="h-10 rounded-xl px-4 border cursor-pointer focus:border-gray-400 outline-none"
                            name="status"
                            onChange={handleChange}
                        >
                            {openTask ? (
                                openTask.status ? (
                                    <>
                                        <option value={true}>Completed</option>
                                        <option value={false}>
                                            In Progress
                                        </option>
                                    </>
                                ) : (
                                    <>
                                        <option value={false}>
                                            In Progress
                                        </option>
                                        <option value={true}>Completed</option>
                                    </>
                                )
                            ) : (
                                <>
                                    <option value={false}>In Progress</option>
                                    <option value={true}>Completed</option>
                                </>
                            )}
                        </select>
                    </div>
                    <button
                        className="w-1/3"
                        onClick={() =>
                            handleSubmit(
                                isEditOpen
                                    ? REQUEST_TYPE.PUT
                                    : REQUEST_TYPE.POST
                            )
                        }
                    >
                        {isEditOpen ? "Edit task" : "Add Task"}
                    </button>
                </form>
            </div>
            {data.length == 0 ? (
                <div className="flex w-full justify-center my-5">
                    <span className="text-xl font-bold text-red-500">
                        No Todo tasks found!
                    </span>
                </div>
            ) : (
                <>
                    <StatusSection
                        name="In Progress"
                        status={false}
                        data={data}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        activeTaskId={openTask.id}
                    />
                    <StatusSection
                        name="Completed"
                        status={true}
                        data={data}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        activeTaskId={openTask.id}
                    />
                </>
            )}
        </section>
    );
}
