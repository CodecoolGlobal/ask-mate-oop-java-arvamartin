import { useState } from "react";


function Questionform({onPostSuccess}) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")


    async function handlePost(event) {
        event.preventDefault();

        const formData = { title, description };
        const response = await fetch('/api/question/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) {
            onPostSuccess();
        }
    }


    return (
        <div>
            <form onSubmit={handlePost}>
                <label> Your question:  </label>
                <input placeholder="question" onChange={(event) => setTitle(event.target.value)} />
                <input placeholder="description" onChange={(event)=> setDescription(event.target.value)} />
                <button>Post</button>
                <button onClick={onPostSuccess}>Back</button>
            </form>
        </div>
    )
}

export default Questionform;