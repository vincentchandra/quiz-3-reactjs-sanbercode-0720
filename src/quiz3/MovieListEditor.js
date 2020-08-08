import React,{useState, useContext, useEffect} from 'react'
import './public/css/style.css'
import IsLoginContext from '../IsLoginContext'
import axios from 'axios'

const MovieListEditor = () => {
    const [inputTitle, setInputTitle] = useState("")
    const [inputDescription, setInputDescription] = useState("")
    const [inputYear, setInputYear] = useState(0)
    const [inputDuration, setInputDuration] = useState(0)
    const [inputGenre, setInputGenre] = useState("")
    const [inputRating, setInputRating] = useState(0)
    const [isError, setIsError] = useState(false)
    const [daftarFilm, setDaftarFilm] = useState(null)
    const [selectedId, setSelectedId] = useState(-1)
    const [isEmpty, setIsEmpty] = useState(false)
    const [isLogin,setIsLogin] = useContext(IsLoginContext)
    useEffect(() => {
        if(daftarFilm===null){
            axios.get(`http://backendexample.sanbercloud.com/api/movies`)
            .then(res=>{
                setDaftarFilm(res.data.map(el =>{
                    return{id:el.id, title: el.title, description: el.description, year:el.year, duration:el.duration,
                    genre:el.genre, rating:el.rating}
                }))
            })
        }
    }, [daftarFilm])
    const handleChangeTitle = (event) => {
        setInputTitle(event.target.value)
    }
    const handleChangeDescription = (event) => {
        setInputDescription(event.target.value)
    }
    const handleChangeYear = (event) => {
        setInputYear(event.target.value)
    }
    const handleChangeDuration = (event) => {
        setInputDuration(event.target.value)
    }
    const handleChangeGenre = (event) => {
        setInputGenre(event.target.value)
    }
    const handleChangeRating = (event) => {
        setInputRating(event.target.value)
    }
    const handleSubmit = (event) =>{
        event.preventDefault()
        let title = inputTitle
        let description = inputDescription
        let year = inputYear
        let duration = inputDuration
        let genre = inputGenre
        let rating = inputRating
        if(rating>10 || rating<1){
            setIsError(true)
            return;
        }
        setIsError(false)
        if (title.replace(/\s/g,'') !== ""){
            setIsEmpty(false)
            if(selectedId===-1){
    
                axios.post(`http://backendexample.sanbercloud.com/api/movies`,{title,description,year,duration,genre,rating})
                .then(res=>{
                    setDaftarFilm([...daftarFilm,{id:res.data.id,title:res.data.title,description:res.data.description,
                        year:res.data.year,duration:res.data.duration,genre:res.data.genre,rating:res.data.rating}])
                })
            }
            else{
                axios.put(`http://backendexample.sanbercloud.com/api/movies/${selectedId}`,{title,description,year,duration,genre,rating})
                .then(res=>{
                    let dataFilm = daftarFilm.find(el=>el.id===selectedId)
                    dataFilm.title = title
                    dataFilm.description = description
                    dataFilm.year = year
                    dataFilm.duration = duration
                    dataFilm.genre = genre
                    dataFilm.rating = rating
                    setDaftarFilm([...daftarFilm])
                })
            }
            setInputTitle("")
            setInputDescription("")
            setInputDuration(0)
            setInputGenre("")
            setInputRating(0)
            setInputYear(0)
        } else{
            setIsEmpty(true)
        }
        
    }
    const handleEdit = (event) =>{
        let idFilm = parseInt(event.target.value)
        let selectedFilm = daftarFilm.find(x => x.id === idFilm)
        setInputTitle(selectedFilm.title)
        setInputDescription(selectedFilm.description)
        setInputDuration(selectedFilm.duration)
        setInputGenre(selectedFilm.genre)
        setInputRating(selectedFilm.rating)
        setInputYear(selectedFilm.year)
        setSelectedId(idFilm)
    }
    const handleDelete = (event) => {
        let idFilm = parseInt(event.target.value)
        let newDaftarFilm = daftarFilm.filter(el=> el.id!== idFilm)
        axios.delete(`http://backendexample.sanbercloud.com/api/movies/${idFilm}`)
        .then(res=>{
            console.log(res)
        })
        setDaftarFilm([...newDaftarFilm])
    }
    
    
    
    return(
        <>
        {
            isLogin===true &&(

                <div className="MovieListEditor">
                <h1>Movie List Editor</h1>
                    <div className="list">
                    <table style={{border:"1px solid"}}>
                    <tr>
                        <th>Title</th>
                        <th>Rating</th>
                        <th>Duration</th>
                        <th>Genre</th>
                        <th>Year</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                    {daftarFilm!==null && daftarFilm.map(el=>{
                            return(
                                <>
                                <tr>
                                    <td>{el.title}</td>
                                    <td>{el.rating}</td>
                                    <td>{el.duration}</td>
                                    <td>{el.genre}</td>
                                    <td>{el.year}</td>
                                    <td>{el.description}</td>
                                    
                                    <td>
                                        <button onClick={handleEdit} value={el.id}>edit</button>   
                                        <button onClick={handleDelete} style={{display:"inline"}} value={el.id}>delete</button>
                                    </td>
                                </tr>
                                </>
                            )
                        })}   
                    </table>
                    </div>
                    <form style={{width:"100%"}} onSubmit={handleSubmit}>
                    <div style={{textAlign:"center", marginBottom:"10px"}}>
                        <label>Title: </label>
                        <input type="text" value={inputTitle} onChange={handleChangeTitle}/>
                    </div>
                    <div style={{textAlign:"center", marginBottom:"10px"}}>
                        <label>Rating: </label>
                        <input type="number" value={inputRating} onChange={handleChangeRating}/>
                    </div>
                    <div style={{textAlign:"center", marginBottom:"10px"}}>
                        <label>Duration: </label>
                        <input type="number" value={inputDuration} onChange={handleChangeDuration}/>
                    </div>
                    <div style={{textAlign:"center", marginBottom:"10px"}}>
                        <label>Genre: </label>
                        <input type="text" value={inputGenre} onChange={handleChangeGenre}/>
                    </div>
                    <div style={{textAlign:"center", marginBottom:"10px"}}>
                        <label>Year: </label>
                        <input type="number" value={inputYear} onChange={handleChangeYear}/>
                    </div>
                    <div style={{textAlign:"center", marginBottom:"10px"}}>
                        <label>Description: </label>
                        <textarea rows="4" cols="50" value={inputDescription} onChange={handleChangeDescription}/>
                    </div>
                   
                    
                    
                    
                    {isEmpty===true && (
                        <p style={{color:"red",textAlign:"center"}}>Input the title!</p>
                    )}
                    {isError===true && (
                        <p style={{color:"red",textAlign:"center"}}>Rating minimum 1, maximum 10!</p>
                    )}
                    
                    <div style={{justifyContent:"center",display:'flex',alignItems:'center'}}>
                        <button>Submit</button>
                    </div>
                    
                    
                </form>
                </div>
            )
        }
        {
            isLogin===false &&(
                <h1 style={{textAlign:"center",paddingTop:"50px"}}>You need to Login first!</h1>
            )
        }
    
        </>
    )
}

export default MovieListEditor;