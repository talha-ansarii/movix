import React, { useEffect } from 'react'
import "./style.scss"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import Img from '../../../components/lazyLoadingImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';




const HeroBanner = () => {

    const {url} = useSelector( (state) => state.home );

    const [background , setBackground] = useState("");
    const [query , setQuery] = useState("");
    const navigate = useNavigate();
    const {data, loading} = useFetch("/movie/upcoming");

    useEffect( () => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
        setBackground(bg);
    }, [data] )
    
    const searchQueryHandler = (event) => {
        if( event.key === "Enter" && query.length > 0){
            navigate(`/search/${query}`)
        }

    }

  return (
    <div className='heroBanner'>

        {!loading && <div className='backdrop-img'>
            <Img src={background} />
        </div>}

        <div className='opacity-layer'></div>


        <ContentWrapper>
        <div className='heroBannerContent'>
            <span className='title'>Welcome.</span>
            <span className='subTitle'>Millions of movies and TV shows to discover. Explore now.</span>
            <div className='searchInput'>
                <input 
                    type='text'
                    placeholder='Search for a movie or TV show....'
                    onChange={ (e) => setQuery(e.target.value) }
                    onKeyUp={searchQueryHandler}
                />  

                <button>Search</button>  
                
            </div>
            </div>
\
        </ContentWrapper>

        

        </div>

  )
}

export default HeroBanner
