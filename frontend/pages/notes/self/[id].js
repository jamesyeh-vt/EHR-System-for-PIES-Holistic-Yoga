import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function SelfAssessmentView() {
    const router = useRouter();
    const {id} = router.query;
    const [assessment, setAssessment] = useState(null);

    useEffect(() => {
        if (!id) return;
        const token = typeof window !== "undefined" ? localStorage.getItem("pies-token") : null;
        if (!token) return;
        fetch(`http://localhost:8080/self-assessments/${id}`, {
            headers: {Authorization: `Bearer ${token}`},
        })
            .then((res) => res.json())
            .then(setAssessment)
            .catch((err) => console.error(err));
    }, [id]);

    if (!assessment) {
        return <p className="p-4">Loading...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-4">
            <h1 className="text-xl font-semibold">Self Assessment #{id}</h1>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(assessment, null, 2)}</pre>
        </div>
    );
}
