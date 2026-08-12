export function StudentForm({ getStudent }) {
    async function addStudent(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form)
        // console.log(formData.get("student_name"))
        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }
        const data = Object.fromEntries(formData.entries());


        const response = await fetch("http://localhost/websites/3rdYear/Re-React/SMS/backend/api/api.php?action=student", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(response => 
             response.json())

        if (response["success"]) {
            console.log(response)
            alert("Added Student Sucessfully");
            form.reset()
            getStudent();
        } else {
            alert(response["message"])
        }

    }

    return (
        <>
            <form onSubmit={(e) => { addStudent(e) }}>
                <label htmlFor="student_name">Full Name: </label>
                <input type="text" name="student_name" id="student_name" /> <br />

                <label htmlFor="age">Age: </label>
                <input type="number" name="age" id="age" min={1} /> <br /> <br />

                <h6>Course: </h6>

                <input type="radio" name="course" value={"Computer Science"} />
                <label htmlFor="">Computer Science</label>

                <input type="radio" name="course" value={"Business Administration"} />
                <label htmlFor="">Business Administration</label>

                <input type="radio" name="course" value={"Mechanical Engineering"} />
                <label htmlFor="">Mechanical Engineering</label>

                <input type="radio" name="course" value={"Information Technology"} />
                <label htmlFor="">Information Technology</label>

                <input type="radio" name="course" value={"Civil Engineering"} />
                <label htmlFor="">Civil Engineering</label>
                <br /> <br />
                <button>
                    Submit
                </button>

            </form>
        </>
    )

}