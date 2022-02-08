import './charList.scss';

import useMarvellService from '../../services/MarvellService';
import { useState, useEffect, useRef } from 'react/cjs/react.development';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMesage';
import PropTypes from 'prop-types';

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    
    const marvellService = useMarvellService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset) => {
        onCharListLoading();
        marvellService.getAllCharacters(offset)
            .then(onCharsLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharsLoaded = (newChars) => { 
        let ended = false;
        if(newChars.length < 9) {
            ended = true;
        }

        setChars(chars => [...chars, ...newChars]);
        setLoading(loading => false);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const onError = () => {
        setLoading(loading => false);
        setError(true);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        let items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
                imgStyle = {'objectFit' : 'unset'};
            }

        return (
            <li className="char__item"
                key={item.id}
                tabIndex={0}
                ref = {el => itemRefs.current[i] = el}
                onClick={() => {
                    props.onCharSelected(item.id);
                    focusOnItem(i);
                    }
                }>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
        )
      });
      return (
        <ul className="char__grid">
            {items}
             </ul>
      ) 
    }

    const items = renderItems(chars);

    const errorMessage = error ? < ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;
        
    return (
        <div className="char__list">            
                {errorMessage}
                {content}
                {spinner}         
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{"display": charEnded ? "none" : "block"}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    ) 
}


 CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
 }

export default CharList;