import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoudary from "../errorBoudary/ErrorBoundary";
import SearchChar from "../form/SearchChar";
import decoration from '../../resources/img/vision.png';
import { useState } from "react";

const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

    const  onCharSelected = (id) => {
        setChar(id);
        }

    return (
        <>
           <ErrorBoudary>
                <RandomChar/>
            </ErrorBoudary>
                <div className="char__content">
                    <ErrorBoudary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoudary> 
                    <div>
                        <ErrorBoudary>
                            <CharInfo charId = {selectedChar}/>
                        </ErrorBoudary> 
                        <ErrorBoudary>
                            <SearchChar/> 
                        </ErrorBoudary> 
                    </div>                  
                </div> 
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;