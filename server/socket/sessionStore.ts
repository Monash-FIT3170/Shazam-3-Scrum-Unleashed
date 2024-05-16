export default class InMemorySessionStore {
    private sessions:Map<string, string>;

    constructor() {
        this.sessions = new Map();
    }

    findSession(id:string) {
        return this.sessions.get(id);
    }

    saveSession(id:string, session:string) {
        this.sessions.set(id, session);
    }

    findAllSessions() {
        return [...this.sessions.values()];
    }
}


