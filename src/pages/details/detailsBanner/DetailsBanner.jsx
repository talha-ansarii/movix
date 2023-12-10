import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadingImage/Img";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../PlayIcon";
import VideoPopup from "../../../components/videoPopup/VideoPopup";


const DetailsBanner = ({ video, crew }) => {

    const [show , setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
  const { mediaType, Id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${Id}`);

  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((g) => g.id)

  const director = crew?.filter((f) => f.job === "Director" )
  const writer = crew?.filter((f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer" )

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  console.log(video?.key)

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data?.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>

              <ContentWrapper>
                <div className="content">
                    <div className="left">
                        {
                            data.poster_path ? 
                            (
                                <img src={url.backdrop + data.poster_path} className="posterImg" ></img>
                            ) : (
                                <Img className="posterImg" src={PosterFallback}></Img>
                            )
                        }
                        </div>
                    <div className="right">
                        <div className="title" >
                            {
                                `${data.name || data.title} (${dayjs(data?.release_date).format("YYYY")})`
                            }
                        </div>
                        <div className="subtitle">
                            {
                                data.tagline
                            }
                        </div>
                        <Genres data={_genres} />

                        <div className="row">
                            <CircleRating rating={data.vote_average.toFixed(1)} />
                            <div 
                            onClick= {
                                        () => {
                                            setShow(true)
                                            setVideoId(video?.key)
                                        }
                                    }
                            className="playbtn">

                                <PlayIcon 
                                    

                                />
                                <span className="text">
                                    Watch Trailer
                                </span>
                            </div>
                        </div>

                        <div className="overview">
                            <div className="heading">
                                Overview
                            </div>
                            <div className="description">
                                {data.overview}
                            </div>
                        </div>

                        <div className="info">
                            {
                                data.status && (
                                    <div className="infoItem">
                                        <span className="text bold">
                                            Status:{" "}
                                        </span>
                                        <span className="text">
                                            {data.status}
                                        </span>
                                    </div>
                                )
                            }
                            {
                                data.release_date && (
                                    <div className="infoItem">
                                        <span className="text bold">
                                            Release Date:{" "}
                                        </span>
                                        <span className="text">
                                            {dayjs(data.release_date).format("MMM D, YYYY")}
                                        </span>
                                    </div>
                                )
                            }

                            {
                                data.runtime && (
                                    <div className="infoItem">
                                        <span className="text bold">
                                            Runtime:{" "}
                                        </span>
                                        <span className="text">
                                            {toHoursAndMinutes(data.runtime)}
                                        </span>
                                    </div>
                                )
                            }
                        </div>

                        {
                            director?.length > 0 && (
                                <div className="info">
                                <span className="text bold">
                                    Director: {" "}
                                </span>
                                    <span className="text">
                                        {
                                            director?.map((d, i) => (
                                                <span key={i}>
                                                    {d.name}
                                                    {director.length - 1 !== i && ", " }
                                                </span>
                                            ))
                                        }
                                    </span>
                                </div>
                            )
                        }

                        {
                            writer?.length > 0 && (
                                <div className="info">
                                <span className="text bold">
                                    Writer: {" "}
                                </span>
                                    <span className="text">
                                        {
                                            writer?.map((d, i) => (
                                                <span key={i}>
                                                    {d.name}
                                                    
                                                    {writer.length - 1 !== i && ", " }
                                                </span>
                                            ))
                                        }
                                    </span>
                                </div>
                            )
                        }

                        {
                            data?.created_by?.length > 0 && (
                                <div className="info">
                                <span className="text bold">
                                    Created By: {" "}
                                </span>
                                    <span className="text">
                                        {
                                            data?.created_by?.map((d, i) => (
                                                <span key={i}>
                                                    {d.name}
                                                    
                                                    {data?.created_by.length - 1 !== i && ", " }
                                                </span>
                                            ))
                                        }
                                    </span>
                                </div>
                            )
                        }



                    </div>
                </div>
                <VideoPopup 
                show={show}
                setShow={setShow}
                videoId = {videoId}
                setVideoId = {setVideoId} />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
