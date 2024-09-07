/**
 * Stores all the sessions that have recently been connected to the server.
 */
export default class InMemorySessionStore {
  /**
   * A Map of Session IDs (private) to User IDs (public)
   */
  private sessions: Map<string, string>;

  constructor() {
    this.sessions = new Map();
  }

  findSession(sessionID: string) {
    return this.sessions.get(sessionID);
  }

  saveSession(sessionID: string, userID: string) {
    this.sessions.set(sessionID, userID);
  }
}
