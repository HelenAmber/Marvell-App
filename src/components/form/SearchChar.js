import { Formik, Form, Field, ErrorMessage} from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import './SearchChar.scss';
import useMarvellService from '../../services/MarvellService';

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
 
    const toPage = char ? <button className="button button__main"
                    type="submit"
                    >
                <Link to={`/characters/${char[0].id}`}><div className='inner'>                 
                    To Page</div> </Link>   
            </button> : null;

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
                                <ErrorMessage className="char__search-error" 
                                              name="name" 
                                              component="div" />
                            <button className="button button__main"
                                    type="submit"
                                    >
                                <div className='inner'>Find</div>    
                            </button>
                           {char ? toPage : null} 
                        </div>
                </Form> 
            </Formik>
        </div>
    )
}

export default SearchChar;