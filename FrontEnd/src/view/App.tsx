import { useEffect, useRef, useState } from 'react'
import '../style/App.css'
import { asyncGet } from '../utils/fetch'
import { api } from '../enum/api'
import { People } from '../interface/People'
import { resp } from '../interface/resp'

function App() {

  const [students, setStudents] = useState<Array<People>>([])

  const cache = useRef<boolean>(false)

  useEffect(() => {
    /**
     * 做緩存處理, 避免多次發起請求
     */
    if (!cache.current) {
      cache.current = true;
      asyncGet(api.getAll).then((res: resp<Array<People>>) => {
        if (res.code == 200) {
          setStudents(res.body)
        }
      });
    }
  }, [])

  const studentList = students ? students.map((people: People) => {
    return (
      <div className='student' key={people._id}>
        <p>序號: {people.no}</p>
        <p>姓名: {people.name}</p>
        <p>電話: {people.phone}</p>
        <p>性別: {people.gender}</p>
        <p>Email: {people.email}</p>
      </div>
    )
  }) : "loading"

  return (
    <>
      <div className="container">
        {studentList}
      </div>
    </>
  )
}

export default App
