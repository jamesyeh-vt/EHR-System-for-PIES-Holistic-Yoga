import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function IntakeFormView() {
    const router = useRouter();
    const {id} = router.query;
    const [form, setForm] = useState(null);

    useEffect(() => {
        if (!id) return;
        const token = typeof window !== "undefined" ? localStorage.getItem("pies-token") : null;
        if (!token) return;
        fetch(`http://localhost:8080/intakes/${id}`, {
            headers: {Authorization: `Bearer ${token}`},
        })
            .then((res) => res.json())
            .then(setForm)
            .catch((err) => console.error(err));
    }, [id]);

    if (!form) {
        return <p className="p-4">Loading...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-4">
            <h1 className="text-xl font-semibold">Intake Form #{id}</h1>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(form, null, 2)}</pre>
        </div>
    );
}
