import './comicsList.scss';

import useMarvellService from '../../services/MarvellService';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../errorMessage/errorMesage';
import Spinner from '../spinner/spinner';

const ComicsList = () => {
    const {loading, error, getAllComics} = useMarvellService();
    const [comics, setComics] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(17);
    const [comicsEnded, setComicsEnded] = useState(false);

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        getAllComics(offset)
          .then(onComicsLoaded)
     }

    const onComicsLoaded = (newComics) => {
        let ended = false;
        if(newComics.length < 8) {
            ended = true;
        }        
        setComics(comics => [...comics, ...newComics]);
        setOffset(offset => offset + 8);
        setComicsEnded(comicsEnded => ended);
        setNewComicsLoading(newComicsLoading => false);
     }

    function renderComics(arr){
        
       let items = arr.map((item) => {
            return (
                 <li className="comics__item"
                    key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.name}</div>
                        <div className="comics__item-price">{item.price}$</div>
                    </Link>
                </li>
            )
        });

        return (       
            <ul className="comics__grid">
                {items}
            </ul>
            )
    }
    
    const items = renderComics(comics);
    const errorMessage = error ? <ErrorMessage/> : null;
    const loadinComics = loading ? <Spinner/>: null

    return (
        <div className="comics__list">
                {items}
                {errorMessage} 
                {loadinComics}        
            <button className="button button__main button__long"
                    onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
            </button>
        </div>
    )    
}

export default ComicsList;