export function resolvePromise(prms, promiseState) {
    function dataACB(data) {
      if (promiseState.promise === prms) {
        promiseState.data = data;
      }
    }
  
    function errorACB(error) {
      if (promiseState.promise === prms) {
        promiseState.error = error;
      }
    }
  
    if (prms !== null) {
      promiseState.promise = prms;
      promiseState.data = null;
      promiseState.error = null;
      prms.then(dataACB).catch(errorACB);
    }
  }
  