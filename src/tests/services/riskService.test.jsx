import { getRisks } from "../../services/riskService";
import { mockApi } from "../../services/apiClient";

jest.mock("../../services/apiClient");

describe("riskService", () => {
    it("should fetch all risks", async () => {
        const mockRisks = [{ id: 1, title: "Risk 1" }, { id: 2, title: "Risk 2" }];
        mockApi.mockResolvedValue({ data: mockRisks });

        const result = await getRisks();
        expect(result).toHaveLength(2);
        expect(result[0].title).toBe("Risk 1");
        expect(mockApi).toHaveBeenCalled();
    });
});
