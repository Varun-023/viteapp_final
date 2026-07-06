import { getAudits } from "../../services/auditService";
import { mockApi } from "../../services/apiClient";

jest.mock("../../services/apiClient");

describe("auditService", () => {
    it("should fetch all audits", async () => {
        const mockAudits = [{ id: 1, title: "Audit 1" }, { id: 2, title: "Audit 2" }];
        mockApi.mockResolvedValue({ data: mockAudits });

        const result = await getAudits();
        expect(result).toHaveLength(2);
        expect(result[0].title).toBe("Audit 1");
        expect(mockApi).toHaveBeenCalled();
    });
});
