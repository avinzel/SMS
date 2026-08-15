import "./StudentForm.css"
export function StudentForm({ formModal,setFormModal, getStudents, isAdd, student, setAddStatus, setUpdateStudent }) {
    async function submitStudentForm(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form)
        // console.log(formData.get("student_name"))
        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }
        const data = Object.fromEntries(formData.entries());

        let response;
        if (isAdd) {
            response = await fetch("http://localhost/websites/3rdYear/Re-React/SMS/backend/api/api.php?action=student", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }).then(response =>
                response.json())

            if (response["success"]) {
                console.log(response)
                alert(response["message"]);
                form.reset()
                getStudents();
                setFormModal();
            } else {
                alert(response["message"])
                setFormModal(false)
            }
        } else {
            data["student_id"] = student["student_id"];
            response = await fetch("http://localhost/websites/3rdYear/Re-React/SMS/backend/api/api.php?action=student", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }).then(response => response.json())

            if (response["success"]) {
                console.log(response)
                alert("Student Update Sucessfully");
                form.reset()
                setAddStatus(true);
                setUpdateStudent({});
                getStudents();
                setFormModal(false)
            } else {
                setAddStatus(true);
                setUpdateStudent({});
                alert(response["message"])
                setFormModal(false)
            }
        }
    }

    return (
        <>
            <div className="form-container" style={{ display: formModal? "block" : "none"}} onClick={() =>{
                setFormModal(false)
            }}>
                <form onSubmit={(e) => { submitStudentForm(e) }} onClick={(e)=> {e.stopPropagation()} }>
                    <h2>Student Form</h2>
                    <h3>Personal Information </h3>
                    <label htmlFor="student_name">Full Name: </label>
                    <input type="text" name="student_name" id="student_name" defaultValue={isAdd ? "" : student["student_name"]} /> <br /><br />

                    <label htmlFor="age">Age: </label>
                    <input type="number" name="age" id="age" min={1} defaultValue={isAdd ? "" : student["age"]} /> <br /> <br />

                    <h3>Course </h3>

                    <input type="radio" name="course" value={"Computer Science"}
                        defaultChecked={
                            isAdd ? false : student["course"] == "Computer Science" ? true : false
                        } />
                    <label htmlFor="" >Computer Science</label>

                    <input type="radio" name="course" value={"Business Administration"}
                        defaultChecked={
                            isAdd ? false : student["course"] == "Business Administration" ? true : false
                        } />
                    <label htmlFor="">Business Administration</label>

                    <input type="radio" name="course" value={"Mechanical Engineering"}
                        defaultChecked={
                            isAdd ? false : student["course"] == "Mechanical Engineering" ? true : false
                        } />
                    <label htmlFor="">Mechanical Engineering</label>

                    <input type="radio" name="course" value={"Information Technology"}
                        defaultChecked={
                            isAdd ? false : student["course"] == "Information Technology" ? true : false
                        } />
                    <label htmlFor="">Information Technology</label>

                    <input type="radio" name="course" value={"Civil Engineering"}
                        defaultChecked={
                            isAdd ? false : student["course"] == "Civil Engineering" ? true : false
                        } />
                    <label htmlFor="">Civil Engineering</label>
                    <br /> <br />
                    <button className={isAdd ? "add-button" : "upd-button"}>
                        {isAdd ? "Submit" : "Update"}
                    </button>

                </form>
            </div>

        </>
    )

}