import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './SearchChar.scss';

const SearchChar = () => {
    
    return (
        <div className='char__search-form'>
        <Formik 
            initialValues = {{
                name:''
            }}
            validation = {Yup.object({
                name: Yup.string()
                        .min(2, 'Минимум два символа')
                        .required('Обязательное поле!')
            }) 
            }
            onSubmit = {(values) => console.log(JSON.stringify(values, null, 2))
            }>
            <Form>
                <label htmlFor="name" className="char__search-label">Or find a character by name</label>
                    <div className='char__search-wrapper'>
                        <Field type="text" name="name"/>
                            <ErrorMessage className="char__search-error" name="name" component="div" />
                                <button className="button button__main"
                                        type="submit">
                                        <div className='inner'>Find</div>    
                                </button>  
                    </div>
            </Form> 
        </Formik>
    </div>
    )
}

export default SearchChar;