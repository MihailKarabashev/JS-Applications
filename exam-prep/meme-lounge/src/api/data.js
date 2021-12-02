import * as api from "./api.js";

const host = "http://localhost:3030";
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getAll() {
    return await api.get(host + '/data/memes?sortBy=_createdOn%20desc');
}

export async function create(data) {
    return await api.post(host + '/data/memes', data);
}

export async function getById(id) {
    return await api.get(host + '/data/memes/' + id);
}

export async function deleteById(id) {
    return await api.del(host + '/data/memes/' + id);
}

export async function edit(id, data) {
    return await api.put(host + '/data/memes/' + id, data);
}

export async function getPersonlInfo(id) {
    return await api.get(host + `/data/memes?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
}