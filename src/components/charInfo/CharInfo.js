import './charInfo.scss';
import {Component} from 'react'
import MarvellService from '../../services/MarvellService';
import Spinner from '../spinner/spinner';
import Skeleton from '../skeleton/Skeleton'
import ErrorMessage from '../errorMessage/errorMesage'


class CharInfo extends Component{
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvellService = new MarvellService();

    componentDidMount(){
        this.updateChar();
    }

    componentDidUpdate(prevProps){
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false});
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true});
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }
        this.onCharLoading();

        this.marvellService
        .getCharacter(charId)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }

    render(){
        const {char, loading, error} = this.state;

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

export default CharInfo;