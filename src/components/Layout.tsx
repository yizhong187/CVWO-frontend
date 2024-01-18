import React, { ReactNode } from 'react';
import CustomAppBar from './CustomAppBar';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <CustomAppBar />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
