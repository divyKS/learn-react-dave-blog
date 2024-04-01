import { Outlet } from "react-router-dom"
import Header from "../Components/Header";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { DataProvider } from "../Context/DataContext";
import useWindowWidthCalculator from "../hooks/useWindowWidth";

const HomeLayout = () => {
  const { width } = useWindowWidthCalculator();

  return (
    <>
        <div className="container">
            <Header heading="My Blog Site" width={width} />
            <DataProvider>
                <Nav />
                <Outlet />
            </DataProvider>
            <Footer />
        </div>
    </>
  )
}

export default HomeLayout