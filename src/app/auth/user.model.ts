export class User {
    constructor(
        public id: number,
        public title: string,
        public isAdmin: boolean,
        public mobile: string,
        private _token: string,
        public designation: string,
        public expirationTime: number
    ) {}

    get token(): string {
        const currentTime = (new Date()).getTime();
        if (this.expirationTime > currentTime) {
            return this._token;
        }
        return '';
    }
}

