import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmMwMzYwZmU0ODU5MmNhNWRkNzg5YzYzYTAxMmY3ZSIsInN1YiI6IjY1NzM3ZWFiYzRmNTUyMDE0ZDk3MzQyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q-2YiDLazMBddoEo63p0FyWBG7qNrkJRfcU0m5tbjJs";

const headers = {
    Authorization : "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url,params) => {
    try{
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params
        })
        return data;

    }catch(err){
        console.log(err)
        return err;
    }
}

