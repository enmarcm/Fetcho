/**
 * @module fetcho
 * @description Módulo para realizar peticiones HTTP utilizando como base fetch.
 * @version 1.0
 * @author Enmanuel Colina <theenmanuel123@gmail.com>
 */

/**
 * Función asincrónica para realizar peticiones HTTP utilizando fetch.
 *
 * @param {Object} params - Objeto que contiene los parámetros para la petición.
 * @param {string} params.url - La URL a la que se realizará la petición.
 * @param {string} params.method - El método HTTP a utilizar (GET, POST, etc.).
 * @param {Object} [params.body] - El cuerpo de la petición, si es necesario.
 * @param {boolean} [params.isCors=false] - Indica si la petición debe ser realizada con CORS.
 * @returns {Promise<Object>} - Retorna una promesa que resuelve con los datos de la respuesta, o false si ocurre un error.
 * @throws {Error} - Lanza un error si la respuesta no es correcta.
 */
const fetcho = async ({ url, method, body, isCors = false}) => {
  try {
    const configPost = {
      method: "POST",
      credentials: "include",
      cors: isCors ? "cors" : "no-cors",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(body),
    };

    const configGet = {
      method: "GET",
      credentials: "include",
      cors: "cors",
    };

    const config = method.toLowerCase() === "post" ? configPost : configGet;

    const response = await fetch(url, config);

    if(!response.ok) throw new Error(`La respuesta no es correcta, el status es ${response.status}`)

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Ocurrio un error realizando un fetch, donde la url era ${url} y el error fue ${error.message}`)
    return false
  }
};

export default fetcho