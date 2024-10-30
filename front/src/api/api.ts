import axios from "axios";
import { Student } from "@/types/Student";

const API_URL = "http://localhost:8081/api/v1"
const STUDENT_URL = API_URL + "/student"

export const getStudents = () =>
    axios.get("http://localhost:8081/api/v1/student", {withCredentials: true})

export const createStudent = (fullName: string, groupName: string, avgRating: string) =>
    axios.put(STUDENT_URL,
        {fullName, groupName, avgRating},
        {withCredentials: true}
)

export const updateStudent = (student: Student | undefined, fullName: string, groupName: string, avgRating: string) =>
    axios.post(STUDENT_URL,
        { ...student, fullName, groupName, avgRating },
        {withCredentials: true}
)

export const deleteStudent = (studentId: number) =>
    axios.delete(STUDENT_URL+`/${studentId}`, {withCredentials: true})
