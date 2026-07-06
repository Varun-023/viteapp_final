import { render, screen } from "@testing-library/react";
import Risk from "../pages/Risk";
import * as riskService from "../services/riskService";

jest.mock("../services/riskService");

describe("Risk Page", () => {
    it("renders risk management sections and table after loading", async () => {
        const mockRisks = [
            { id: 1, riskName: "Data Breach Risk", level: "High" }
        ];
        riskService.getRisks.mockResolvedValue(mockRisks);

        render(<Risk />);

        expect(await screen.findByText("Risk Management")).toBeInTheDocument();
        expect(screen.getByText("Risk Matrix Heat Map")).toBeInTheDocument();
        expect(screen.getByText("Risk Registry")).toBeInTheDocument();
        expect(screen.getByText("Risk Name")).toBeInTheDocument();
        expect(screen.getByText("Data Breach Risk")).toBeInTheDocument();
        expect(screen.getAllByText("High").length).toBeGreaterThan(0);
    });
});
