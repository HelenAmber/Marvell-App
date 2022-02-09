
import {useHttp} from '../hooks/http.hook'

const useMarvellService = () => {
    const {loading, request, error, clearError} = useHttp();

const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
const _apiKey = 'apikey=8087a107a8ca7d63fae9095e07eebca4';
const _baseOffset = 210;
const _baseOffsetComics = 17;

const  getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

const  getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0]);
    }

const getAllComics = async (offset = _baseOffsetComics) => {
        const resData = await request(`${_apiBase}comics?limit=8&offset=17${offset}&${_apiKey}`);
        return resData.data.results.map(_transformComic);
}

const  getComic = async (id) => {
    const resData = await request(`${_apiBase}comics/${id}?${_apiKey}`)
    return _transformComic(resData.data.results[0]);
}

const  _transformCharacter = (char) => {
        if (!char.description){
            char.description = ('Character description missing');
        }
        if (char.description.length > 200){
            char.description = `${char.description.slice(0, 201)}...`
        }
      return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

     const _transformComic = (comic) => {
         return {
            id: comic.id,
            name: comic.title,
            description: comic.description || 'There is no description',
            pageCount: comic.pageCount ? `${comic.pageCount} p.` : 'No information',
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            language: comic.textObjects.language || 'en-us',
            price: comic.prices[0].price
         }
     }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic}
}
export default useMarvellService;