import './comicsList.scss';

import useMarvellService from '../../services/MarvellService';
import { useState, useEffect } from 'react';

const ComicsList = () => {
    const {loading, error, clearError, getAllComics} = useMarvellService();
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(17);

    useEffect(() => {
        onRequest(offset);
    }, []);

    const onRequest = (offset) => {
        getAllComics(offset)
          .then(onComicsLoaded)
     }

    const onComicsLoaded = (comics) => {
         setComics(comics);
     }

    function renderComics(arr){
        
       let items = arr.map((item, i) => {
            return (
                 <li className="comics__item"
                    key={i}>
                    <a href="#">
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

    <div className="comics__list">
            {items}         
        <button className="button button__main button__long">
                <div className="inner">load more</div>
        </button>
    </div>
    
}

export default ComicsList;