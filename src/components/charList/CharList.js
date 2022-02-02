import './charList.scss';

import MarvellService from '../../services/MarvellService';
import { Component } from 'react/cjs/react.development';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMesage'

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false
    }
    
    marvellService = new MarvellService();

    componentDidMount() {
        this.updateChars();
   }

    onCharsLoaded = (chars) => { 
        this.setState({
            chars, 
            loading: false});      
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true});
    }

    updateChars = () => {
        this.marvellService           
            .getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }

    
    render(){
        const {chars, loading, error} = this.state;
        const errorMessage = error ? < ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View chars={chars} onCharSelected={this.props.onCharSelected}/> : null;
        
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {content}
                    {spinner}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        ) 
    }
}

 const View = ({chars, onCharSelected}) => {
   
    
    return chars.map((item) => {       
        
            return (
                <li className="char__item"
                    key={item.id}
                    onClick={() => onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt="abyss" style={{"objectFit": "unset"}}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
 }

export default CharList;