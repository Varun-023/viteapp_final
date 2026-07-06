import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar Component", () => {
    it("renders search input correctly", () => {
        const mockOnSearch = jest.fn();
        render(<SearchBar onSearch={mockOnSearch} />);
        
        const input = screen.getByPlaceholderText("Search...");
        expect(input).toBeInTheDocument();
        
        fireEvent.change(input, { target: { value: "test query" } });
        expect(mockOnSearch).toHaveBeenCalledWith("test query");
    });
});
