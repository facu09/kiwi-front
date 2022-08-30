//que es un Toast: son notificaciones que aparecen y se van
import useStyles from './useStyles';
import './Toast.css';

const Toast = ({message}) => {

    const styles = useStyles();

    const onClickAceptar = () => {
        // alert("Aca tendria que cerrar la vetana, voy a tener que usar una variable de sesion del local storage")
        console.log ("paso por el click del Aceptar del Toast")
    }

    const onClickAdd1 = () => {
        console.log("paso por onClickAdd1")
    }

    return (
        <div className = {styles.container}>
            <div className={styles.body}>
                <h5 className={styles.text} > {message}:</h5>
                <h6>Mensaje que va de posta</h6>
                <p></p>
                <button className='Prd__BtnAdd' onClick={() => onClickAdd1()}>+</button>
                <button  onClick={() => onClickAceptar()}>Aceptar</button>

            </div>
        </div>
    );
};

export default Toast;
