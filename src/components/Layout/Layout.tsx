
import { StyledLayout } from "./Layout.styles";

type TypeLayout = {
    children: React.ReactNode;
};
const Layout = ({ children }: TypeLayout) => {
    return (
        <StyledLayout>
        <header>Header</header>
        <main>{children}</main>
        <footer>Footer</footer>
        </StyledLayout>
    );
};

export default Layout;
