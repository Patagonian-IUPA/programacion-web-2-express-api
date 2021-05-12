/**
 * Error específico para recursos inexistentes en la DB.
 */
class ResourceNotFoundError extends Error {
  /**
   * @param {string} message
   * @param {string} resource
   * @param {number} id
   */
  constructor(message, resource, id) {
    super(message);
    this.resource = resource;
    this.id = id;
  }
}

/**
 * @typedef {Object} TUser
 * @property {string} username Usuario.
 * @property {string} password Password.
 * @property {string} name Nombre.
 * @property {number} age Edad.
 *
 * @typedef {TUser & {
 *    id: number,
 *  }} TUserDB
 *
 * @typedef {Object} TFilterQuery
 * @property {string|undefined} username Usuario.
 * @property {string|undefined} password Password.
 * @property {string|undefined} name Nombre.
 * @property {number|undefined} age Edad.
 */

/**
 * Symbol para propiedad ID.
 */
const idKey = Symbol('_id');

/**
 * Último ID.
 *
 * @type {number}
 */
let lastDbID = 0;

/**
 * Validar datos del usuario.
 *
 * @param {TUser} userData
 */
function validateUser(userData) {
  if (!userData) {
    throw new Error(`No se ha definidio el usuario`);
  }

  if (!userData.name || !userData.name.trim()) {
    throw new Error(`La propiedad 'name' es requerida`);
  }

  if (userData.username && !userData.username.trim()) {
    throw new Error(`La propiedad 'username' no puede ser vacía`);
  }

  if (userData.password && !userData.password.trim()) {
    throw new Error(`La propiedad 'password' no puede ser vacía`);
  }

  if (
    !userData.age ||
    isNaN(userData.age) ||
    userData.age < 18 ||
    userData.age > 200
  ) {
    throw new Error(`La propiedad 'age' es inválida`);
  }
}

/**
 * @param {string} username
 * @param {string} password
 * @param {string} name
 * @param {number} age
 * @returns {TUser | TUserDB}
 */
function _addUser(username, password, name, age) {
  let user = {
    username,
    password,
    name,
    age,
  };

  validateUser(user);

  lastDbID++;

  user = {
    [idKey]: lastDbID,

    get id() {
      return this[idKey];
    },

    ...user,
  };

  return user;
}

/**
 * Base de datos.
 *
 * @type {TUserDB[]}
 */
const DB = [
  _addUser('juan', '123456', 'Juan', 30),
  _addUser('edu', 'pass', 'Edu', 34),
  _addUser('luci', 'clave', 'Luciana', 25),
];

module.exports = {
  /**
   * Listar.
   *
   * @param {string|undefined} filterName Filtrar por nombre.
   * @returns {TUserDB[]}
   */
  list(filterName) {
    let users = DB;

    if (filterName && filterName.trim()) {
      filterName = filterName.trim().toLowerCase();

      users = users.filter((user) =>
        user.name.toLowerCase().includes(filterName)
      );
    }

    return users;
  },

  /**
   * Buscar un usuario por ID.
   *
   * @param {number} userId ID de Usuario.
   * @returns {TUserDB | undefined}
   */
  find(userId) {
    return DB.find((u) => u.id === userId);
  },

  /**
   * Buscar usuarios.
   *
   * @param {TFilterQuery} query Query de búsqueda.
   * @returns {TUserDB[]}
   */
  search(query) {
    let results = DB;

    for (const [key, value] of Object.entries(query)) {
      results = results.filter((record) => record[key] === value);
    }

    return results;
  },

  /**
   * Agregar un usuariro.
   *
   * @param {TUser} userData
   */
  add(userData) {
    validateUser(userData);
    const { username, password, name, age } = userData;
    const user = _addUser(username, password, name, age);
    DB.push(user);
    return user;
  },

  /**
   * Actualizar un usuario.
   *
   * @param {number} userId
   * @param {TUser & {
   *    username?: string,
   *    password?: string,
   *  }} newUserData
   */
  update(userId, newUserData) {
    const user = this.find(userId);

    if (!user) {
      throw new ResourceNotFoundError(
        `No existe un usuario con ID "${userId}"`,
        'user',
        userId
      );
    }

    validateUser(newUserData);

    // Actualiza datos

    if (newUserData.username) {
      user.username = newUserData.username;
    }

    if (newUserData.password) {
      user.password = newUserData.password;
    }

    user.name = newUserData.name;
    user.age = newUserData.age;

    return user;
  },

  /**
   * Elimina un usuario.
   *
   * @param {number} userId
   */
  remove(userId) {
    const user = this.find(userId);

    if (!user) {
      throw new ResourceNotFoundError(
        `No existe un usuario con ID "${userId}"`,
        'user',
        userId
      );
    }

    const userIndex = DB.findIndex((item) => item.id === userId);

    if (userIndex > -1) {
      DB.splice(userIndex, 1);
    }
  },

  ResourceNotFoundError,
};
