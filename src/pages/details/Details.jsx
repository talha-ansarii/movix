import React from 'react'
import useFetch from "../../hooks/useFetch"
import { useParams } from 'react-router-dom'
import "./style.scss"
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/cast'
import VideosSection from './videoSection/VideosSection'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendations'

const Details = () => {

  const {mediaType, Id} = useParams();
  const {data, loading} = useFetch(`/${mediaType}/${Id}/videos`)
  const {data: credits, loading: creditsLoading} = useFetch(`/${mediaType}/${Id}/credits`)
  // console.log(credits?.crew)
  return (
    <div>
        <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
        <Cast data={credits?.cast} loading={creditsLoading} />
        <VideosSection data={data} loading={loading}/>
        <Similar mediaType={mediaType} Id={Id} />
        <Recommendation mediaType={mediaType} Id={Id}/>
    </div>
  )
}

export default Details