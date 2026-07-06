import { render } from "@testing-library/react";
import Loader from "../components/Loader";

describe("Loader Component", () => {
    it("renders circular progress successfully", () => {
        const { container } = render(<Loader />);
        expect(container.querySelector(".MuiCircularProgress-root")).toBeInTheDocument();
    });
});
