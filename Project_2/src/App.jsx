import Header from './Header';
import Menu from './Menu';
import Content from './contente';

export default function App() {
  return (
    <div className="layout-container flex flex-col h-screen">
      <Header />
      <div className="body-container flex flex-col md:flex-row flex-1 overflow-hidden">
        <Menu />
        <Content />
      </div>
    </div>
  );
}