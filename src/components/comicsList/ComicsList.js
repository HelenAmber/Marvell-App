import './comicsList.scss';

import useMarvellService from '../../services/MarvellService';
import { useState, useEffect } from 'react';

const ComicsList = () => {
    const {loading, error, clearError, getAllComics} = useMarvellService();
    const [comics, setComics] = useState([]);
    const [newComicLoading, setNewComicLoading] = useState(false);
    const [offset, setOffset] = useState(17);
    const [comicsEnded, setComicsEnded] = useState(false);

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewComicLoading(false) : setNewComicLoading(true);
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
        setNewComicLoading(newComicLoading => false);
     }

    function renderComics(arr){
        
       let items = arr.map((item, i) => {
            return (
                 <li className="comics__item"
                    key={item.id}>
                    <a href={item.url}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.name}</div>
                        <div className="comics__item-price">{item.price}$</div>
                    </a>
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

    return (
    <div className="comics__list">
            {items}         
        <button className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
        </button>
    </div>
    )
    
}

export default ComicsList;