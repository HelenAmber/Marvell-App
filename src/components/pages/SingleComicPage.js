import './singleComicPage.scss';

import { useParams, Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import useMarvellService from '../../services/MarvellService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMesage';


const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);

    const {loading, error, getComic, clearError} = useMarvellService();

    useEffect(() => {
        updateComic();
    }, [comicId])

    const onComicLoaded = (comic) => {
        setComic(comic); 
    }

    const updateComic = () => {        
      clearError();
      getComic(comicId)
        .then(onComicLoaded)
    }

    const errorMessage = error ? < ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {name, description, pageCount, thumbnail, language, price} = comic;
    return (
        <div className="single-comic">
            <Helmet>
              <meta
                  name="description"
                  content={`${name} comics book`}
              />
              <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;