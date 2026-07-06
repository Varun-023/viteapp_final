import { render, screen } from "@testing-library/react";
import ErrorState from "../components/ErrorState";

describe("ErrorState Component", () => {
    it("renders error message correctly", () => {
        render(<ErrorState message="Something went wrong!" />);
        expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
    });
});
