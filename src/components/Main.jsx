import axios from "axios";
import { useEffect, useState } from "react";

let staticData = [{}];

const REQUEST_TYPE = { POST: "post", PUT: "put" };

export default function Main() {
    const [data, setData] = useState([{}]);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [inputData, setInputData] = useState({ name: "", status: false });
    const [openTask, setOpenTask] = useState({});
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        // axios
        //     .get("https://localhost:7014/api/Todo")
        //     .then((response) => setData(response.data));
        setData(staticData);
    }, [refresh]);

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
        if (type === "select-one")
            value === "true" ? (value = true) : (value = false);
        setInputData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (type) => {
        if (type === REQUEST_TYPE.PUT) {
            staticData.map((task) => {
                if (task.id === openTask.id) {
                    task.name = inputData.name;
                    task.status = inputData.status;
                }
            });
            // axios
            //     .put(`https://localhost:7014/api/Todo/${openTask.id}`, {
            //         name: inputData.name,
            //         status: inputData.status,
            //     })
            //     .then(() => {
            //         setRefresh((prevState) => !prevState);
            //     })
            //     .catch((error) => {
            //         console.error("Error deleting task:", error);
            //     });
        } else if (type === REQUEST_TYPE.POST) {
            staticData.push({ name: inputData.name, status: inputData.status });
            // axios
            //     .post(`https://localhost:7014/api/Todo`, {
            //         name: inputData.name,
            //         status: inputData.status,
            //     })
            //     .then(() => {
            //         setRefresh((prevState) => !prevState);
            //     })
            //     .catch((error) => {
            //         console.error("Error deleting task:", error);
            //     });
        }
    };

    const handleDelete = (id) => {
        staticData.map((task, index) => {
            if (task.id === id) {
                staticData.splice(index, 1);
            }
        });
        // axios
        //     .delete(`https://localhost:7014/api/Todo/${id}`)
        //     .then(() => {
        //         setRefresh((prevState) => !prevState);
        //     })
        //     .catch((error) => {
        //         console.error("Error deleting task:", error);
        //     });
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

export const StatusSection = ({
    name,
    data,
    status,
    handleEdit,
    handleDelete,
    activeTaskId,
}) => {
    return (
        <section className="px-3 box-border mt-5">
            <div className=" border-b py-2 font-bold">
                <h1 className="text-3xl">{name}</h1>
            </div>
            <div className="w-full flex font-semibold text-2xl py-3 shadow-sm">
                <h2 className="w-1/3">Name</h2>
                <h2 className="w-1/3">Status</h2>
                <h2 className="w-1/3">Actions</h2>
            </div>
            <div>
                <ul className="list-none">
                    {data.map((task, index) => {
                        if (status) {
                            if (task.status) {
                                return (
                                    <li
                                        key={index}
                                        className="w-full flex py-3 bg-gray-100 px-3 rounded my-2 border items-center"
                                    >
                                        <span className="w-1/3">
                                            {task.name}
                                        </span>
                                        <span className="w-1/3 text-green-500 font-bold">
                                            {"Completed"}
                                        </span>
                                        <div className="w-1/3 flex gap-2">
                                            <span
                                                className={`px-3 py-2 rounded-full text-gray-50 font-bold bg-orange-400 cursor-pointer hover:bg-orange-500 ${
                                                    activeTaskId === task.id &&
                                                    "bg-orange-600 shadow-inner"
                                                }`}
                                                value={task.id}
                                                onClick={() =>
                                                    handleEdit(
                                                        task.id,
                                                        task.name,
                                                        task.status
                                                    )
                                                }
                                            >
                                                Edit
                                            </span>
                                            <span
                                                className="px-3 py-2 rounded-full text-gray-50 font-bold bg-red-500 cursor-pointer hover:bg-red-600"
                                                onClick={() =>
                                                    handleDelete(task.id)
                                                }
                                            >
                                                Delete
                                            </span>
                                        </div>
                                    </li>
                                );
                            }
                        } else {
                            if (!task.status) {
                                return (
                                    <li
                                        key={index}
                                        className="w-full flex py-3 bg-gray-100 px-3 rounded my-2 border items-center"
                                    >
                                        <span className="w-1/3">
                                            {task.name}
                                        </span>
                                        <span className="w-1/3 text-orange-400 font-bold">
                                            {"In Progress"}
                                        </span>
                                        <div className="w-1/3 flex gap-2">
                                            <span
                                                className={`px-3 py-2 rounded-full text-gray-50 font-bold bg-orange-400 cursor-pointer hover:bg-orange-500 ${
                                                    activeTaskId === task.id &&
                                                    "bg-orange-600 shadow-inner"
                                                }`}
                                                value={task.id}
                                                onClick={() =>
                                                    handleEdit(
                                                        task.id,
                                                        task.name,
                                                        task.status
                                                    )
                                                }
                                            >
                                                Edit
                                            </span>
                                            <span
                                                className="px-3 py-2 rounded-full text-gray-50 font-bold bg-red-500 cursor-pointer hover:bg-red-600"
                                                onClick={() =>
                                                    handleDelete(task.id)
                                                }
                                            >
                                                Delete
                                            </span>
                                        </div>
                                    </li>
                                );
                            }
                        }
                    })}
                </ul>
            </div>
        </section>
    );
};
