import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/clerk-react";
import Img1 from "../assets/Google-Docs-logo.png" ;
import Img2 from "../assets/SearchIcon.jpeg" ;
import { useState } from "react";

// Props for the Topbar component to receive the search function
interface TopbarProps {
    onSearch?: (searchTerm: string) => void;
}

export const Topbar = ({ onSearch }: TopbarProps = {}) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Handle search input changes
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        
        // Call the onSearch prop if it exists
        if (onSearch) {
            onSearch(newSearchTerm);
        }
    };

    // Handle search form submission
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    return(
        <nav className="Topbar">
            <div className="logodiv">
                <img src={Img1} alt="Logo" />
                <span> Docs </span>
            </div>
            <form className="Searchbar" onSubmit={handleSearchSubmit}>
                <img src={Img2} alt="Search" />
                <input 
                    type="text" 
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />   
            </form>
            <div className="user-section">
                <SignedIn>
                    <UserButton afterSignOutUrl="/"/>
                </SignedIn>
                <SignedOut>
                    <SignInButton/>
                </SignedOut>
            </div>
        </nav>
    )
}