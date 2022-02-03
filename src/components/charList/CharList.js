import './charList.scss';

import MarvellService from '../../services/MarvellService';
import { Component } from 'react/cjs/react.development';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMesage';
import PropTypes from 'prop-types';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
        newItemLoading: false, 
        offset: 210,
        charEnded: false
    }
    
    marvellService = new MarvellService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvellService
            .getAllCharacters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharsLoaded = (newChars) => { 
        let ended = false;
        if(newChars.length < 9) {
            ended = true;
        }

        this.setState(({offset, chars}) => ({
            chars: [...chars, ...newChars], 
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));      
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true});
    }

    render(){
        const {chars, loading, error, newItemLoading, offset, charEnded} = this.state;
        const errorMessage = error ? < ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View chars={chars} onCharSelected={this.props.onCharSelected} charId={this.props.charId}/> : null;
        
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {content}
                    {spinner}
                </ul>
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{"display": charEnded ? "none" : "block"}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        ) 
    }
}

 const View = ({chars, onCharSelected, charId}) => {
      
    return chars.map((item) => {       
        const selectedCharId = charId;
        const styleSelectedChar = { 
            boxShadow: "0 5px 20px red",
            transform: "translateY(-8px)"
        };
            
            return (
                <li className="char__item"
                    key={item.id}
                    style={selectedCharId === item.id ? styleSelectedChar : null}
                    onClick={() => onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt="abyss" style={{"objectFit": "unset"}}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
 }

 CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
 }

export default CharList;