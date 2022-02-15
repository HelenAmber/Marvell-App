import { Formik, Form, Field, ErrorMessage as ErrorMessageFormik} from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import './SearchChar.scss';
import useMarvellService from '../../services/MarvellService';
import ErrorMessage from '../errorMessage/errorMesage'

const SearchChar = () => {
    const {loading, error, clearError, getCharacterBySearch} = useMarvellService();
    const [char, setChar] = useState(null);

    const updateChar = (charname) => {
        clearError();
        getCharacterBySearch(charname)
            .then(onCharLoaded)
    }  

    const onCharLoaded = (char) => {   
        setChar(char); 
    }
    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const toPage = !char ? null : char.length > 0 ?
        <div className="char__search-wrapper">
            <div type="submit" className="char__search-success"> There is! Visit {char[0].name} page?</div>
                <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                    <div className='inner'>To Page</div>
                </Link>   
            </div> : 
            <div className="char__search-error">
                The character was not found. Check the name and try again
            </div>;

    return (
        <div className='char__search-form'>
            <Formik 
                initialValues = {{
                    name:''
                }}
                validation = {Yup.object({
                    name: Yup.string()
                            .min(2, 'Enter at least two characters')
                            .required('The field is required')}) 
                }
                onSubmit = {({name}) => { updateChar(name) }}>

                <Form>
                    <label htmlFor="name" 
                           className="char__search-label">Or find a character by name</label>
                        <div className='char__search-wrapper'>
                            <Field type="text" 
                                   name="name" 
                                   placeholder="Enter the character's name"/>
                                <ErrorMessageFormik className="char__search-error" 
                                              name="name" 
                                              component="div" />
                            <button className="button button__main"
                                    type="submit"  disabled={loading}
                                    >
                                <div className='inner'>Find</div>                                    
                            </button> 
                            
                        </div>
                </Form> 
            </Formik>
            {toPage}
            {errorMessage}
        </div>
    )
}

export default SearchChar;