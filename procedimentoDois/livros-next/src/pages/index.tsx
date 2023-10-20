import Head from "next/head";
import { Menu } from "../../componentes/Menu";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Loja Next</title>
      </Head>

      <Menu />

      <main className="container mt-4">
        <h1 className="text-center">Página Inicial</h1>
      </main>
    </div>
  );
};

export default Home;
