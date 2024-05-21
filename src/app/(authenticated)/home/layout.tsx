'use server'

import NavBar from '@/app/components/NavBar';

export default async function HomeLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <NavBar>
            {children}
        </NavBar>
    )
}