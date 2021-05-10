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
 * @property {string} name Nombre.
 * @property {number} age Edad.
 *
 * @typedef {TUser & {
 *    id: number,
 *  }} TUserDB
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
 * @param {string} name
 * @param {number} age
 * @returns {TUser | TUserDB}
 */
function _userStructure(name, age) {
  let user = {
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
  _userStructure('Juan', 30),
  _userStructure('Edu', 34),
  _userStructure('Luciana', 25),
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
   * Agregar un usuariro.
   *
   * @param {TUser} userData
   */
  add(userData) {
    validateUser(userData);
    const { name, age } = userData;
    const user = _userStructure(name, age);
    DB.push(user);
    return user;
  },

  /**
   * Actualizar un usuario.
   *
   * @param {number} userId
   * @param {TUser} newUserData
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

    validateUser(userData);

    // Actualiza datos
    user.name = newUserData.name;
    user.age = newUserData.age;
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
