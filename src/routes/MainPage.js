import React from 'react'
import Row from '../components/Row';
import requests from '../api/requests';
import Banner from '../components/Banner';

function MainPage() {
  return (
    <>
    <Banner />
    <Row  title="NETFLIX ORIGINALS" id="NO" fetchUrl={requests.fetchNetflixOriginals} LargeRow />
    <Row  title="Trending Now" id="TN" fetchUrl={requests.fetchTrending}/>
    <Row  title="Top Rated" id="TR" fetchUrl={requests.fetchNetflixOriginals}/>
    <Row  title="Romanse Movie" id="RM" fetchUrl={requests.fetchRomanceMovies}/>
    <Row  title="Comedy Movie" id="CM" fetchUrl={requests.fetchComedyMovies}/>
    <Row  title="Action Movie" id="AM" fetchUrl={requests.fetchActionMovies}/>
    <Row  title="Documentaries" id="DT" fetchUrl={requests.fetchDocumentaries}/>
    <Row  title="Horro Movie" id="HM" fetchUrl={requests.fetchHorrorMovies}/>
    </>
  )
}

export default MainPage