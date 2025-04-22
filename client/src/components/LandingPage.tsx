import { useState, useEffect } from "react" ;
import { Docs } from "./Docs";
import { io } from "socket.io-client";
import { Topbar } from "./Topbar";
import { Dialogbox } from "./Dialogbox";
  

interface DocumentType {
    _id: string;
    name: string;
    data: {
        ops: any[];
    };
    __v: number;
}


export const LandingPage = () => {
    const [documents, setDocuments] = useState<DocumentType[]>([]) ;
    const [filteredDocuments, setFilteredDocuments] = useState<DocumentType[]>([]) ;
    const [searchTerm, setSearchTerm] = useState("") ;

    useEffect(() => {
        const socket = io(import.meta.env.VITE_SERVER_URL) ;

        socket.emit("get-all-documents") ;

        socket.on("all-documents", (allDocuments) => {
            setDocuments(allDocuments) ;
            setFilteredDocuments(allDocuments) ;
        });
        
        return () => {
            socket.disconnect() ;
        }
    }, []) ;

    // Handle search function
    const handleSearch = (term: string) => {
        setSearchTerm(term) ;
        
        // If search term is empty, show all documents
        if (!term.trim()) {
            setFilteredDocuments(documents) ;
            return ;
        }
        
        // Filter documents by name (case insensitive)
        const filtered = documents.filter(doc => 
            doc.name.toLowerCase().includes(term.toLowerCase())
        ) ;
        
        setFilteredDocuments(filtered) ;
    }

    return(
        <div className="LandingPage">
            <Topbar onSearch={handleSearch} />
            <div className="Docs-container-1">
                <div className="title-1"> Start a new document </div>
                <div> <Dialogbox /> </div>
            </div>

            {filteredDocuments.length > 0 ? (
                <div className="Docs-container-2">
                    <div className="title-2">
                        {searchTerm ? `Search results for "${searchTerm}"` : "Recent documents"}
                    </div>
                    <div className="grid grid-cols-6">
                        {filteredDocuments.map((docs, index) => 
                            <Docs documentId={docs._id} docName={docs.name} key={index}/>
                        )}
                    </div>
                </div>
            ) : documents.length > 0 && searchTerm ? (
                <div className="Docs-container-2">
                    <div className="title-2">No documents found matching "{searchTerm}"</div>
                </div>
            ) : null}
        </div>
    )
}