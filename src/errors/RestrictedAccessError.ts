export class RestrictedAccessError extends Error {
    constructor(message = 'Acceso restringido') {
        super(message);
        this.name = 'RestrictedAccessError';
    }
}
