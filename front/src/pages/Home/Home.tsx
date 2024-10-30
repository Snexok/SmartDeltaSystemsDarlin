import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Student } from "@/types/Student";
import { createStudent, deleteStudent, getStudents, updateStudent } from "@/api";
import classNames from "classnames";

export const Home = () => {
    const navigate = useNavigate()

    const [ students, setStudents ] = useState<Student[]>([])
    const [ student, setStudent ] = useState<Student>()
    const [ fullName, setFullName ] = useState("")
    const [ groupName, setGroupName ] = useState("")
    const [ avgRating, setAvgRating ] = useState("")
    const [ isEditing, setIsEditing ] = useState(false)
    const [ invalidate, setInvalidate ] = useState("")

    const fullNameRef = useRef(null);
    const groupNameRef = useRef(null);
    const avgRatingRef = useRef(null);

    const invalidateFullName = invalidate === "FullName"
    const invalidateGroupName = invalidate === "GroupName"
    const invalidateAvgRating = invalidate === "AvgRating"

    useEffect( () => {
        getStudents()
            .then((resp)=>{
                setStudents(resp.data)
            })
            .catch((err)=>{
                navigate("/login");
            })
    }, [] );

    const submitHandler = () => {
        setInvalidate( "" )
        const fullNameValidated = fullName.split(" ").reduce((a,b) => b.length ? a + 1 : a, 0) === 3
        const valid =
            fullNameValidated &&
            groupName !== "" &&
            avgRating !== ""
        if (valid) {
            if ( !isEditing )
                createStudent( fullName, groupName, avgRating )
                    .then( ( { data } ) => {
                        setStudents( ( students ) => [ ...students, data ] )
                        clearFields()
                    } )
            else
                updateStudent( student, fullName, groupName, avgRating )
                    .then( res => {
                        const uStudent = res.data
                        setStudents( ( students ) => students.map( ( student ) => student.id === uStudent.id ? { ...uStudent } : student ) )
                        clearFields()
                    } )

            setIsEditing(false)
        }
        else
        {
            if (!fullNameValidated)
                setInvalidate("FullName")
            else if (groupName === "")
                setInvalidate("GroupName")
            else if (avgRating === "")
                setInvalidate("AvgRating")

        }
    }

    const deleteHandler = (student: Student) => {
        deleteStudent(student.id)
            .then(() => {
                setStudents((students)=>students.filter((s) => s.id !== student.id))
                clearFields()
            })
        setIsEditing(false)
    }

    const clearFields = () => {
        setFullName("")
        setGroupName("")
        setAvgRating("")
        setIsEditing(false)
    }

    const changeStudentHandler = (selectedStudent: Student) => {
        setIsEditing(true)
        setFullName(`${ selectedStudent.lastName } ${ selectedStudent.name } ${ selectedStudent.patronymic }`)
        setGroupName(selectedStudent.groupName)
        setAvgRating(selectedStudent.avgRating.toString())
        setStudent(selectedStudent)
    }

    useEffect( () => {
        console.log("setInvalidate")
        if (invalidate === "FullName")
            fullNameRef.current.focus();
        else if (invalidate === "GroupName")
            groupNameRef.current.focus();
        else if (invalidate === "AvgRating")
            avgRatingRef.current.focus();
    }, [invalidate] );

    return <div className="text-white p-5 flex flex-col gap-5 items-center">
        {   student && isEditing ?
                (<div className="w-[260px] flex justify-between">
                    <div className="flex gap-1">
                        <span>Редактирование студент с Id:</span>
                        <span className="text-yellow-400 font-semibold">{student.id}</span>
                    </div>
                    <div
                        className="text-red-600 font-bold cursor-pointer z-20"
                        onClick={clearFields}
                    >
                        X
                    </div>
                </div>)
            : <div>
                Добавление нового студента
            </div>
        }
        <div className="w-[250px] flex flex-col justify-center gap-2">
            <div className="w-full">
            {invalidateFullName && <span className="text-red-700 text-xs">Введите корректное ФИО</span>}
            <input value={fullName}
                   ref={fullNameRef}
                   placeholder="ФИО"
                   className={ classNames("w-full px-2 py-1 rounded-lg outline-0 bg-zinc-700 focus:text-yellow-400",
                        {"border-none ": !invalidateFullName},
                        {"border-2 border-red-700": invalidateFullName}) }
                   onKeyDown={(e)=> e.key==="Enter" ? submitHandler() : null}
                   onChange={( { target })=>setFullName(target.value)}
            />
            </div>
            <input value={groupName}
                   ref={groupNameRef}
                   placeholder="Группа"
                   className={ classNames("w-full px-2 py-1 rounded-lg outline-0 bg-zinc-700 focus:text-yellow-400",
                       {"border-none ": !invalidateGroupName},
                       {"border-2 border-red-700": invalidateGroupName}) }
                   onKeyDown={(e)=> e.key==="Enter" ? submitHandler() : null}
                   onChange={({ target })=>setGroupName(target.value)}
            />
            <input value={avgRating}
                   ref={avgRatingRef}
                   placeholder="Средняя оценка"
                   className={ classNames("w-full px-2 py-1 rounded-lg outline-0 bg-zinc-700 focus:text-yellow-400",
                       {"border-none ": !invalidateAvgRating},
                       {"border-2 border-red-700": invalidateAvgRating}) }
                   onKeyDown={(e)=> e.key==="Enter" ? submitHandler() : null}
                   onChange={({ target })=>
                        setAvgRating(target.value.replace(",", ".")
                            .replace(/[^0-9.]/g, '')
                            .replace(/(\..*)\./g, '$1')
                        )
                    }
            />
            <button onClick={submitHandler} className="bg-gray-700 border-none rounded-lg cursor-pointer hover:bg-gray-600 hover:text-yellow-400 active:text-black">
                { isEditing ? "Сохранить" : "Создать" }
            </button>
        </div>
        <div className="w-[350px] flex flex-col justify-center gap-2 text-white">
            {students.map(student=>(
                <div key={student.id}
                     className="flex justify-between gap-2 cursor-pointer hover:text-yellow-400"
                     onClick={()=>changeStudentHandler(student)}
                >
                    <span>{`${ student.lastName } ${ student.name } ${ student.patronymic }`}</span>
                    <div className="flex gap-2">
                        <span>{ student.groupName }</span>
                        <span>{ student.avgRating }</span>
                        <span
                            className="text-red-600 font-bold cursor-pointer z-20"
                            onClick={ (e)=> {
                                e.stopPropagation()
                                deleteHandler( student )
                            } }
                        >
                            X
                        </span>
                    </div>
                </div>
            ) ) }
        </div>
    </div>
}
