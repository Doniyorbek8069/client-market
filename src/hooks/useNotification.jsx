import { useSnackbar } from 'notistack';
import { Fragment } from 'react';

const useNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const action = (key) => (
    <Fragment>
      <button
        className='h-10 w-10 flex items-center justify-center'
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        <i
          className='bi bi-x'
          style={{
            color: 'white',
          }}
        />
      </button>
    </Fragment>
  );
  const setConf = (conf) => {
    if (conf?.msg) {
      enqueueSnackbar(conf.msg, {
        variant: conf.variant ? conf.variant : 'info',
        autoHideDuration: !conf?.duration ? 5000 : conf?.duration,
        action: !conf?.showClose ? action : null,
      });
    }
  };
  return setConf;
};

export default useNotification;
