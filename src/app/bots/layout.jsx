import CategoriButtonBots from "../../components/CategoriButtons";

 
export const metadata = {
    title: 'Bots - Fenixen Forge',
  }

export default function LayoutBots({ children }) {
    return (
        <>
        
        <CategoriButtonBots />
            {children}
        </>
    );
}
