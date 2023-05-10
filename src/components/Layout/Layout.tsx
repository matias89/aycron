
import { StyledLayout } from "./Layout.styles";

type TypeLayout = {
    children: React.ReactNode;
};
const Layout = ({ children }: TypeLayout) => {
    return (
        <StyledLayout>
        <header>
            <h1>Aycron Technical Test</h1>
        </header>
        <main>{children}</main>
        <footer>Developed by Matías Aybar | May 2023</footer>
        </StyledLayout>
    );
};

export default Layout;
