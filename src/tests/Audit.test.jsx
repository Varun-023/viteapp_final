import { render, screen } from "@testing-library/react";
import Audit from "../pages/Audit";
import * as auditService from "../services/auditService";

jest.mock("../services/auditService");

describe("Audit Page", () => {
    it("renders audit table with mock data after loading", async () => {
        const mockAudits = [
            { id: 1, activity: "User Login", user: "Admin", timestamp: "2026-07-06", status: "Success" }
        ];
        auditService.getAudits.mockResolvedValue(mockAudits);

        render(<Audit />);

        expect(await screen.findByText("Audit Management")).toBeInTheDocument();
        expect(screen.getByText("Activity")).toBeInTheDocument();
        expect(screen.getByText("User Login")).toBeInTheDocument();
        expect(screen.getByText("Admin")).toBeInTheDocument();
        expect(screen.getByText("Success")).toBeInTheDocument();
    });
});
