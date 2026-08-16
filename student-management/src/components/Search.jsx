import { useRef } from "react"
import "../styles/Search.css"
export function Search({ setSearchStudent }) {
    const searchFormRef = useRef(null);
    const timer = useRef(null);
    function submitSearch(e) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const student = Object.fromEntries(form.entries());
        clearTimeout(timer.current);
        timer.current = setTimeout(() => { setSearchStudent(student) }, 500)
    }
    return (
        <>
            <div className="student-search-container">
                <form ref={searchFormRef} onSubmit={(e) => submitSearch(e)}>
                    <div className="student-search-field">
                        <label>Search:</label>
                        <input type="text" name="student_name" placeholder="Search by name" onChange={() => { searchFormRef.current.requestSubmit() }} />
                    </div>
                    <div className="student-search-field">
                        <label>Course:</label>
                        <select name="course" onChange={() => { searchFormRef.current.requestSubmit() }}>
                            <option value="">Select Course</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Business Administration">Business Administration</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="Civil Engineering">Civil Engineering</option>
                        </select>
                    </div>
                </form>
            </div>
        </>
    )
}