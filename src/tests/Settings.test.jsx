import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Settings from "../pages/Settings";
import uiReducer from "../redux/uiSlice";

function renderSettings() {
    const store = configureStore({
        reducer: { ui: uiReducer }
    });
    return render(
        <Provider store={store}>
            <Settings />
        </Provider>
    );
}

describe("Settings Page", () => {
    it("renders settings sections and buttons", () => {
        renderSettings();
        expect(screen.getByText("Settings")).toBeInTheDocument();
        expect(screen.getByText("Profile Settings")).toBeInTheDocument();
        expect(screen.getByText("Preferences")).toBeInTheDocument();
        expect(screen.getByText("Security")).toBeInTheDocument();
        expect(screen.getByText("Save Profile")).toBeInTheDocument();
        expect(screen.getByText("Save Preferences")).toBeInTheDocument();
        expect(screen.getByText("Update Password")).toBeInTheDocument();
    });
});
