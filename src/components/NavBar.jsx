import { useState } from "react";
import { Register, Login } from "./LoginAndRegister";

const MODAL_TYPE = {
    REGISTER: "register",
    LOGIN: "login",
    EMPTY: "",
};

export default function NavBar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openModalType, setOpenModalType] = useState("");

    const handleModal = (type) => {
        setIsModalOpen(true);
        setOpenModalType(type);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setOpenModalType(MODAL_TYPE.EMPTY);
    };

    return (
        <>
            <header className="flex items-center justify-between h-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5">
                <h1 className="font-semibold text-white text-3xl">Ravkna</h1>
                {/* <ul className="list-none flex text-gray-50 gap-4 font-bold text-lg relative">
                    <li
                        className={`text-white hover:text-gray-200 cursor-pointer ${
                            openModalType === MODAL_TYPE.LOGIN && "z-20"
                        }`}
                        onClick={() => handleModal(MODAL_TYPE.LOGIN)}
                    >
                        Login
                    </li>
                    <li
                        className={`text-white hover:text-gray-200 cursor-pointer ${
                            openModalType === MODAL_TYPE.REGISTER && "z-20"
                        }`}
                        onClick={() => handleModal(MODAL_TYPE.REGISTER)}
                    >
                        Register
                    </li>
                    {isModalOpen &&
                        (openModalType === MODAL_TYPE.LOGIN ? (
                            <Login />
                        ) : (
                            <Register />
                        ))}
                </ul> */}
            </header>
            {isModalOpen && (
                <div
                    className="w-full h-full bg-slate-800 blur-m opacity-50 absolute left-0 top-0 z-10"
                    onClick={handleCloseModal}
                ></div>
            )}
        </>
    );
}
