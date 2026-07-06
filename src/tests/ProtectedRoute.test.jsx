import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import authReducer from "../redux/authSlice";

function renderWithAuth(isLoggedIn) {
    const store = configureStore({
        reducer: { auth: authReducer },
        preloadedState: {
            auth: { isLoggedIn, user: null, error: "" }
        }
    });

    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={["/dashboard"]}>
                <Routes>
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <div>Protected Content</div>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
}

describe("ProtectedRoute Component", () => {
    it("redirects unauthenticated users to login", () => {
        renderWithAuth(false);
        expect(screen.getByText("Login Page")).toBeInTheDocument();
        expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    });

    it("renders protected content for authenticated users", () => {
        renderWithAuth(true);
        expect(screen.getByText("Protected Content")).toBeInTheDocument();
        expect(screen.queryByText("Login Page")).not.toBeInTheDocument();
    });
});
