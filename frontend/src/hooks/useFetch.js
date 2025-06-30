import { useEffect } from 'react';
import api from '../config/api';


const useFetch = () => {
    useEffect(() => {
        api.get('/cmms')
            .then((response) => {
                setCharacters(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log('Lỗi API:', error);
            });

    }, [setCharacters, setSelectedCharacter]);
}
export default useFetch;