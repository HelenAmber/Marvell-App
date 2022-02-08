import './charInfo.scss';
import {useState, useEffect} from 'react'
import useMarvellService from '../../services/MarvellService';
import Spinner from '../spinner/spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/errorMesage';
import PropTypes from 'prop-types';


const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter} = useMarvellService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const onCharLoaded = (char) => {
        setChar(char); 
    }

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

      getCharacter(charId)
        .then(onCharLoaded)
    }

    const skeleton = char || loading || error ?  null : <Skeleton/>;
    const errorMessage = error ? < ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }   

const View =({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const imgNotFound = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
    let style;

        if (thumbnail === imgNotFound) {
            style = {"objectFit": "contain"};
        } else {
            style = {"objectFit": "cover"};
        }

    return (
        <>
        <div className="char__basics">
            <img src={thumbnail} alt={name} style={style}/>
                <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                        </div>
                </div>
                </div>
                    <div className="char__descr">
                        {description}
                    </div>
                    <div className="char__comics">Comics:</div>
                    <ul className="char__comics-list">
                        {comics.length > 0 ? null : 'There is no comics for this character'}
                        {
                            comics.map((item, i) => { 
                                // eslint-disable-next-line                          
                                if(i > 9) return;
                                    return (
                                    <li key={i} className="char__comics-item">
                                        {item.name}
                                    </li>
                                )   
                            })                       
                        }                  
                    </ul>
        </>    
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;