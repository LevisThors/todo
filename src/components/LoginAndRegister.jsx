export function Register() {
    return (
        <>
            <section className="absolute top-10 right-0 z-20 bg-white p-5 rounded-md">
                <form className="flex flex-col gap-5">
                    <Input type="text" name="Username" />
                    <Input type="email" name="E-Mail" />
                    <Input type="password" name="Password" />
                    <Input type="password" name="Confirm password" />
                    <button className="text-slate-600">Register</button>
                </form>
            </section>
        </>
    );
}

export function Login() {
    return (
        <>
            <section className="absolute top-10 right-0 z-20 bg-white p-5 rounded-md">
                <form className="flex flex-col gap-5">
                    <Input type="email" name="E-Mail" />
                    <Input type="password" name="Password" />
                    <button className="text-slate-600">Login</button>
                </form>
            </section>
        </>
    );
}

function Input({ type, name, onChange }) {
    return (
        <div className="flex flex-col text-slate-700">
            <label htmlFor={name} className="font-bold">
                {name}
            </label>
            <input
                name={name}
                type={type}
                onChange={onChange}
                className="h-10 rounded-xl px-4 border focus:border-gray-400 outline-none"
            />
        </div>
    );
}
