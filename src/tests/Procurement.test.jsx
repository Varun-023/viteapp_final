import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Procurement from "../pages/Procurement";
import * as procurementService from "../services/procurementService";

jest.mock("../services/procurementService");

describe("Procurement Page", () => {
    it("renders procurement form and list after loading", async () => {
        const mockRequests = [
            { id: 1, vendorName: "Acme Corp", amount: "5000", category: "IT", status: "Approved" }
        ];
        procurementService.getProcurementRequests.mockResolvedValue(mockRequests);

        render(
            <BrowserRouter>
                <Procurement />
            </BrowserRouter>
        );

        expect(await screen.findByText("Procurement Form")).toBeInTheDocument();
        expect(screen.getByText("Procurement List")).toBeInTheDocument();
        expect(screen.getAllByText("Vendor Name").length).toBeGreaterThan(0);
        expect(screen.getByText("Acme Corp")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();
    });
});
