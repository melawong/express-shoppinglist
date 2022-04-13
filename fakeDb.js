const items = [];



class Items {
  static items = {};

  static _get(id) {
    const user = User.users[id];
    if (!user) throw new NotFoundError(`No such user: ${id}`);
    return user;
  }

  /** Returns list of all users. */
  static all() {
    return Object.values(User.users);
  }

  /** Find user by id; returns user or throws error. */
  static get(id) {
    return User._get(id);
  }

  /** Add new user and return user. */
  static add(user) {
    User.users[user.id] = user;
  }

  /** Delete user; returns true or throws if cannot find. */
  static delete(id) {
    User._get(id);  // using just for side-effect of error
    delete User.users[id];
    return true;
  }
}

module.exports = { items };