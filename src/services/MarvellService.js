
class MarvellService {
_apiBase = 'https://gateway.marvel.com:443/v1/public/';
_apiKey = 'apikey=8087a107a8ca7d63fae9095e07eebca4'

    getResourse = async (url) => {
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status:${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResourse(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`)
    }
}
export default MarvellService;