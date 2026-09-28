import ProductList from "@/components/shared/header/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

export const metadata = {
  title: 'Home',
}

const Home = async () => {
  const latestProducts = await getLatestProducts();

  return ( 
    <>
      <ProductList data={latestProducts} title="Newest Arrivals"/>
    </> 
  );
}
 
export default Home;