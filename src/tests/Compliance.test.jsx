import { render, screen } from "@testing-library/react";
import Compliance from "../pages/Compliance";
import * as complianceService from "../services/complianceService";

jest.mock("../services/complianceService");

describe("Compliance Page", () => {
    it("renders compliance management sections and table after loading", async () => {
        const mockIssues = [
            { id: 1, issue: "GDPR Non-Compliance", vendor: "Vendor X", severity: "Critical", status: "Open" }
        ];
        complianceService.getComplianceIssues.mockResolvedValue(mockIssues);

        render(<Compliance />);

        expect(await screen.findByText("Compliance Management")).toBeInTheDocument();
        expect(screen.getByText("Violations Tracking")).toBeInTheDocument();
        expect(screen.getByText("Total Issues")).toBeInTheDocument();
        expect(screen.getByText("GDPR Non-Compliance")).toBeInTheDocument();
        expect(screen.getByText("Vendor X")).toBeInTheDocument();
        expect(screen.getAllByText("Critical").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Open").length).toBeGreaterThan(0);
    });
});
