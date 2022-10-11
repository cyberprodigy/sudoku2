import { UserDto } from './../activities/login/model/User';

export enum Keys {
    InputMethod = "inputMethod"
}

export function getUserData(): (UserDto | null) {
    try {
        const item = localStorage.getItem("user-data");
        if (!item) {
            return null;
        }
        return JSON.parse(item) as UserDto;
    } catch (e) {
        return null;
    }
};

export function setUserData(data: UserDto | null): void {
    try {
        localStorage.setItem("user-data", JSON.stringify(data));
    } catch (e) { }
};

export function getSetting(key: Keys) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        return null;
    }
}

export function setSetting(key: Keys, value: string): void {
    try {
        localStorage.setItem(key, value);
    } catch (e) { }
};