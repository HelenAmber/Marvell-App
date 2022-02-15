import useMarvellService from '../../services/MarvellService';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import ErrorMessage from '../errorMessage/errorMesage';
import Spinner from '../spinner/spinner';
import SearchChar from '../form/SearchChar'

const SingleChar = () => {
    const {loading, error, clearError, getCharacterBySearch} = useMarvellService();
    const [char, setChar] = useState({});
    const timeout = 800;

    const errorMessage = error ? < ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;

    return (
        <div className="single_char">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail} = char;
    const imgNotFound = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
    let style;

        if (thumbnail === imgNotFound) {
            style = {"objectFit": "contain"};
        } else {
            style = {"objectFit": "cover"};
        }
  
    return (
        <div className="singlechar__block">
            <img src={thumbnail} style={style} alt="Character_image" className="singlechar__img"/>
            <div className="char__info">
                <p className="singlechar__name">{name}</p>
                <p className="singlechar__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleChar;