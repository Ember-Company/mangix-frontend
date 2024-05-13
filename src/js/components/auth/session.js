import { getSession, getUser } from "../../services/auth";

export default class SessionManager {
  constructor() {
    this.session = null;
    this.error = null;
    this.user = null;
  }

  async validateSession() {
    const { data, error } = await getSession();

    if (error || !data.session) {
      this.setError(error);
      return false;
    }

    this.setSession(data.session);
    return true;
  }

  async user() {
    const { user, userError } = await getUser(this.session);

    this.setUser(user);
    return { user, error };
  }

  setUser(userData) {
    this.user = userData;
  }

  setSession(session) {
    this.session = session ?? null;
  }

  setError(error) {
    this.error = error;
  }
}
