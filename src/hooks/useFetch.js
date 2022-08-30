import { useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { cleanErrorAction, loadingAction, setErrorAction } from '../redux/api';


// se va hacer cargo de todo...dice juli!!!
// se va a poder usar para todo este useFetch

const useFetch = ({ service, onSuccess = () => {}, globalLoader }) => {

    const dispatch = useDispatch();

    const { isError } =  useSelector(store => store.apiReducer ); 

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    // para que funcione hay que pasarle algo
    //  va a loguin, del request, y lo guarda en postman
    //      configura la request de un post en postman
    //          y lo prueba, luego viene acá y ya sabe como configurarlo

    const apiCall = async () => {
        setLoading(true);
        globalLoader && dispatch(loadingAction())
        try{
            const response = await service();
            if (response.status === 200) {
                setData(response.data)
                //# 29/01/22: agrego para actualizar el Error por si ahora SI HA pegando bien
                setError(null)
                onSuccess();
            } else {
                dispatch(setErrorAction({message: response.data.error}));
                //# 29/01/22: agrego para actualizar el token por si ahora NO HA pegando bien
                setData(null);
                setError(response.data.error);
               
            
            }
            setLoading(false)
        } catch (error){
            console.log(error.message)
            dispatch(setErrorAction({message: error.message}))
            // alert(error);
            setError(error.message);
            setLoading(false);
        }
    }

    // mete un useEffect chiquito para que refresque
    // y limpie
    useEffect(() => {
        if(isError) {
            setTimeout(() => {
                dispatch(cleanErrorAction())
            }, 4000);
        }
    }, [isError])

    return [data, error, loading, apiCall];
};

export default useFetch;
