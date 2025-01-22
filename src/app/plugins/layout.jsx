import CategoriButtonPlugins from '../../components/CategoriButtons';

export const metadata = {
  title: 'Plugins - Fenixen Forge',
};

export default function LayoutPlugins({ children }) {
  return (
    <>
      <CategoriButtonPlugins />
      {children}
    </>
  );
}
