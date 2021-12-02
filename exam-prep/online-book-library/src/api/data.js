import * as api from "./api.js";

const host = "http://localhost:3030";
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAll() {
    return await api.get(host + '/data/books?sortBy=_createdOn%20desc');
}

export async function getById(id) {
    return await api.get(host + '/data/books/' + id);
}

export async function create(data) {
    return await api.post(host + '/data/books', data);
}

export async function deleteById(id) {
    return await api.del(host + '/data/books/' + id);
}

export async function edit(id, data) {
    return await api.put(host + '/data/books/' + id, data);
}

export async function getUserBooks(id) {
    return await api.get(host + `/data/books?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
}

export async function addLike(bookId) {
    return await api.post(host + '/data/likes', bookId);
}

export async function getBookLikes(bookId) {
    return await api.get(host + `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}