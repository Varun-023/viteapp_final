import { getComplianceIssues } from "../../services/complianceService";
import { mockApi } from "../../services/apiClient";

jest.mock("../../services/apiClient");

describe("complianceService", () => {
    it("should fetch all compliance issues", async () => {
        const mockIssues = [{ id: 1, title: "Issue 1" }, { id: 2, title: "Issue 2" }];
        mockApi.mockResolvedValue({ data: mockIssues });

        const result = await getComplianceIssues();
        expect(result).toHaveLength(2);
        expect(result[0].title).toBe("Issue 1");
        expect(mockApi).toHaveBeenCalled();
    });
});
