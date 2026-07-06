import { render, screen } from "@testing-library/react";
import Reports from "../pages/Reports";
import * as reportService from "../services/reportService";

jest.mock("../services/reportService");

describe("Reports Page", () => {
    it("renders reports table and export buttons after loading", async () => {
        const mockReports = [
            { id: 1, title: "Monthly Financial Report", status: "Completed" }
        ];
        reportService.getReports.mockResolvedValue(mockReports);

        render(<Reports />);

        expect(await screen.findByText("Reports")).toBeInTheDocument();
        expect(screen.getByText("Report Title")).toBeInTheDocument();
        expect(screen.getByText("Monthly Financial Report")).toBeInTheDocument();
        expect(screen.getByText("Completed")).toBeInTheDocument();
        expect(screen.getByText("Export CSV")).toBeInTheDocument();
        expect(screen.getByText("Export Excel")).toBeInTheDocument();
    });
});
