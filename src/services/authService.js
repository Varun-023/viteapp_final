import usersData from "../mocks/users.json";
import { mockApi } from "./apiClient";

async function loginUser(email, password) {

    const response = await mockApi(usersData, 400);

    const existingEmail = response.data.find((item) => item.email === email);
    if (!existingEmail) {
        throw new Error("Account not found. Please complete Sign Up to continue.");
    }
    if (existingEmail.password !== password) {
        throw new Error("Invalid email or password");
    }
    const user = existingEmail;

    const { password: pwd, ...safeUser } = user;

    return safeUser;

}

async function signupUser(name, email, password, role) {

    const existingUser = usersData.find((item) => item.email === email);
    if (existingUser) {
        throw new Error("Email is already registered. Please login or use a different email.");
    }

    const newUser = {
        id: Math.floor(Math.random() * 1000) + 10,
        name,
        email,
        password,
        role
    };

    // Add new user to the mock database so it can be logged into later in the same session
    usersData.push(newUser);

    const response = await mockApi(newUser, 400);

    const { password: pwd, ...safeUser } = response.data;

    return safeUser;

}

async function getUsers() {

    const response = await mockApi(usersData, 300);

    return response.data.map(({ password, ...user }) => user);

}

export { loginUser, getUsers, signupUser };
