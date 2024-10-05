"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface NavContextType {
	isOpen: boolean;
	toggleNav: () => void;
	openNav: () => void;
	closeNav: () => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export const NavProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isOpen, setIsOpen] = useState(true);

	const toggleNav = () => setIsOpen((prev) => !prev);
	const openNav = () => setIsOpen(true);
	const closeNav = () => setIsOpen(false);

	return (
		<NavContext.Provider value={{ isOpen, toggleNav, openNav, closeNav }}>
			{children}
		</NavContext.Provider>
	);
};

export const useNav = () => {
	const context = useContext(NavContext);
	if (context === undefined) {
		throw new Error("useNav must be used within a NavProvider");
	}
	return context;
};
