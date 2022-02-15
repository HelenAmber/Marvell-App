import useMarvellService from '../../services/MarvellService';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../errorMessage/errorMesage';
import Spinner from '../spinner/spinner';
import AppBanner from '../appBanner/AppBanner'

import './singleCharPage.scss'

const SingleChar = () => {
    const {loading, error, getCharacter, clearError} = useMarvellService();   
    const {id} = useParams();
    const [char, setChar] = useState(null);

    useEffect(() => {
        updateChar()
    }, [id]);

    const charLoaded = (char) => {
        setChar(char);
    }
 
    const updateChar = () => {
        clearError();
            getCharacter(id)
            .then(charLoaded)
    }

    const errorMessage = error ? < ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="single_char">
            <AppBanner/>
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
        <div className="singlechar-block">
            <img src={thumbnail} style={style} alt="Character_image" className="singlechar-block__img"/>
            <div className="char__info">
                <p className="singlechar-block__name">{name}</p>
                <p className="singlechar-block__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleChar;