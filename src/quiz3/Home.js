import React,{useEffect,useState} from 'react'
import './public/css/style.css'
import About from './About.js'
import Routes from './Routes'
import axios from 'axios'
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
const Home = () =>{
    const [daftarFilm, setDaftarFilm] = useState(null)
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
    const compare = (a, b)=> {
        // Use toUpperCase() to ignore character casing
        const bandA = a.rating
        const bandB = b.rating
      
        let comparison = 0;
        if (bandA > bandB) {
          comparison = 1;
        } else if (bandA < bandB) {
          comparison = -1;
        }
        return comparison;
      }
      
    //   daftarFilm.sort(compare);
    return(
        
        <>
            <body>
                
                <section >
                <h1>Daftar Film Terbaik</h1>
                
                {daftarFilm!==null && daftarFilm.sort(compare).map(el=>{
                    return(
                        <>
                        <h2 style={{color:"purple"}}>{el.title}</h2>
                        <p><b>Rating: {el.rating}</b></p>
                        <p><b>Durasi: {el.duration}</b></p>
                        <p><b>Genre: {el.genre}</b></p>
                        <p><b>Year: {el.year}</b></p>
                        <p><b>deskripsi:</b> {el.description}</p>
                        </>
                    )
                })}                
                </section>
                <footer>
                    <h5>copyright &copy; 2020 by Sanbercode</h5>
                </footer>
            </body>
            <Switch>
                <Route path="/about" component={About}/>
                <Route path="/"/>
            </Switch>

        </>
    )
}

export default Home;