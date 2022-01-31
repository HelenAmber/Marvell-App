

class MarvellService {
    getResourse = async (url) => {
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status:${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResourse('https://gateway.marvel.com:443/v1/public/characters?apikey=8087a107a8ca7d63fae9095e07eebca4')
    }
}
export default MarvellService;